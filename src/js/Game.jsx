import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Application, Graphics, Container, FillGradient } from "pixi.js";
import KeyListener from "./KeyListener";
import Monitor from "./Monitor";

const Background = styled.div`
  background-color: var(--game-purple);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const GameContainer = styled.div`
 border: 4px solid #59076d;
 border-radius: 12px;
`;

const InputContainer = styled.div`
  position: fixed;
  bottom: 8%;
  width: 90vw;
  background-color: #2c0e34;
  left: 5vw;
  height: 50px;
  display: flex;
  border: 4px solid #59076d;
  border-radius: 12px;
  justify-content: center;
`

function Game() {
  // =================================START-SECTION-{VARIABLES}===========================================
  const Window = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  }).current;
  const backgroundRef = useRef();
  let canvasRef = useRef({}).current;
  let tetBlock = useRef([]).current;
  const width = 10;
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  let tetronimo = useRef([
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ]).current;
  let blockData = useRef({
    currentPosition: 4,
    currentShape: 4,
    currentRotation: 0,
  }).current;

  let prevBlockData = useRef({
    prevPosition: 4,
    prevShape: 2,
    prevRotation: 2,
  }).current;

  const colorBg = [
    ["#6dfa51", "#0cab06"],
    ["#910ca9", "#e122fa"],
    ["#fdfd55", "#c5d90e"],
    ["#168cfa", "#30dde7"],
    ["#f11010", "#e33f3f"],
  ];

  let gameLoop = useRef().current;
  let gameStart = useRef(false).current;
  let gameScale = useRef(window.innerWidth < 450 ? 0.9 : 0.8).current;
  let current = useRef(
    tetronimo[blockData.currentShape][blockData.currentRotation]
  ).current;
  let noBlocks = useRef(130).current;
  let aspectRatio = useRef(noBlocks / 100).current;
  let drawingMetrics = useRef({}).current;
  let pauseGameLoop = useRef(false).current;
  let activateInput = useRef(true).current;
  let PAUSE_TIME = useRef(2000).current;
  const [controlBlocks, setControlBlocks] = useState(
    [
      Math.floor(Math.random()*5),
      Math.floor(Math.random()*5),
    ]
  )
  let run = useRef(true).current;

  // =====================================END-SECTION-{VARIABLES}=======================================

  // =====================================START-SECTION-{INIT}=======================================
  const init = async () => {
    run = false;
    const app = new Application();
    await app.init({
      preserveDrawingBuffer: true,
      width: gameScale * Window.width,
      height: gameScale * Window.width * aspectRatio,
      antialias: true,
      backgroundAlpha: 0,
    });

    backgroundRef.current.appendChild(app.canvas);
    canvasRef.app = app;
    const gridBlockContainer = new Container({ x: 6, y: 6 });
    canvasRef.app.stage.addChild(gridBlockContainer);
    canvasRef.gridBg = gridBlockContainer;

    drawingMetrics.width = canvasRef.app.canvas.width - 6;
    drawingMetrics.rectSize = drawingMetrics.width / 10;
    drawingMetrics.offsetWidth =
      window.innerWidth < 450
        ? drawingMetrics.width - 9 * 4 - 8
        : drawingMetrics.width - 9 * 6 - 12;
    drawingMetrics.size = drawingMetrics.offsetWidth / 10;
    drawingMetrics.borderRadius = window.innerWidth < 450 ? 4 : 8;
    
    drawBgGrids();
    drawGrids();
    window.addEventListener("resize", () => {
      Window.height = window.innerHeight;
      Window.width = window.innerWidth;
      canvasRef.app.renderer.resize(
        Window.width * gameScale,
        Window.width * gameScale * aspectRatio
      );
      // destroyBgGrids();
      drawBgGrids();
      drawGrids();
    });

    gameLoop = setInterval(() => {
      !pauseGameLoop && moveBlock();
    }, 1000);
  };
  // =======================================END-SECTION-{INIT}=====================================
  const drawBgGrids = ()=>{
    const { size, borderRadius, rectSize } = drawingMetrics;
    const gridBlocks = [];
    let tempGrid = [];
    for (let i = 1; i <= noBlocks; i++) {
      const graphics = new Graphics();
      tempGrid.push(graphics);
      if (i % 10 === 0) {
        gridBlocks.push(tempGrid);
        tempGrid = [];
      }
    }
    gridBlocks.forEach((grid, y) => {
      grid.forEach((block, x) => {
        block.position.set(x * rectSize, y * rectSize);
        const rectGradient = new FillGradient(0, 0, size / 2, size / 2);
        ["#380f80", "#1b073f"].forEach((value, index) => {
          rectGradient.addColorStop(index, value);
        });
        block.roundRect(0, 0, size, size, borderRadius).fill(rectGradient);
        block
          .roundRect(0, 0, size, size, borderRadius)
          .stroke({ color: "#5f4689", width: 2 });
        canvasRef.gridBg.addChild(block);
      });
    });
  }
  // ========================================START-SECTION-{DRAW_GRIDS}====================================
  const drawGrids = () => {
    const { rectSize } = drawingMetrics;
    const gridBlocks = [];
    let tempGrid = [];
    const addGraphics = (graphics) => {
      graphics.collisionType = "taken-base";
      tetBlock.push(graphics);
    };
    for (let i = 1; i <= noBlocks; i++) {
      const graphics = new Graphics();
      tempGrid.push(graphics);
      tetBlock.push(graphics);
      if (i % 10 === 0) {
        gridBlocks.push(tempGrid);
        tempGrid = [];
      }

      // FOR BLOCK COLLISION DETECTION AT THE BASE
      // THIS WILL BE THE BASE OF THE COLLISION DETECTION
      if (i === noBlocks) {
        Array.from({ length: 10 }, () => new Graphics()).forEach((graphics) =>
          addGraphics(graphics)
        );
      }
    }
    gridBlocks.forEach((grid, y) => {
      grid.forEach((block, x) => {
        block.position.set(x * rectSize, y * rectSize);
        canvasRef.gridBg.addChild(block);
      });
    });
  };
  // ====================================END-SECTION-{DRAW_GRIDS}========================================

  // ====================================START-SECTION-{DESTROY_BG_GRIDS}========================================
  const destroyBgGrids = () => {
    canvasRef.app.stage.removeChild(canvasRef.gridBg);
    canvasRef.gridBg.destroy();
  };
  // ====================================END-SECTION-{DESTROY_BG_GRIDS}========================================

  // ==================================START-SECTION-{MOVE_BLOCK}==========================================
  const moveBlock = () => {
    gameStart && undrawCurrentBlock();
    drawCurrentBlock();
    freezeBlockVertically();
    blockData.currentPosition += 10;
  };
  // ==================================END-SECTION-{MOVE_BLOCK}==========================================

  // ===================================START-SECTION-{DRAW-CURRENT_BLOCK}=========================================
  /**
   * @param {Function} drawCurrentBlock - drawFunction
   * WILL DRAW THE CURRENT BLOCK INCASE ANY OF THE BLOCK DATA IS MODIFIED
   * CAN CAUSE PERFOMANCE ISSUES IF NOT USED PROPERLY
   */
  const drawCurrentBlock = () => {
    current = tetronimo[blockData.currentShape][blockData.currentRotation];
    gameStart = true;
    const { size, borderRadius } = drawingMetrics;
    const rectGradient = new FillGradient(0, 0, size / 2, size / 2);
    colorBg[blockData.currentShape].forEach((value, index) => {
      rectGradient.addColorStop(index, value);
    });

    current.forEach((value) => {
      tetBlock[blockData.currentPosition + value]
        .roundRect(0, 0, size, size, borderRadius)
        .fill(rectGradient);
    });
    prevBlockData.prevPosition = blockData.currentPosition;
    prevBlockData.prevRotation = blockData.currentRotation;
    prevBlockData.prevShape = blockData.currentShape;
  };

  // ================================END-SECTION-{DRAW_CURRENT_BLOCK}============================================

  // =================================START-SECTION-{UNDRAW_CURRENT_BLOCK}===========================================
  /**
   * @param {Function} undrawCurrentBlock - undrawFunction
   * WILL UNDRAW THE CURRENT BLOCK INCASE ANY OF THE BLOCK DATA IS MODIFIED
   * SHOULD BE USED ALONG WITH THE DRAW_CURRENT_BLOCK FUNCTION
   */
  const undrawCurrentBlock = () => {
    current = tetronimo[prevBlockData.prevShape][prevBlockData.prevRotation];
    current.forEach((value) => {
      tetBlock[prevBlockData.prevPosition + value].clear();
    });
  };

  // ======================================END-SECTION-{UNDRAW_CURRENT_BLOCK}======================================

  // ====================================START-SECTION-{FREEZE_BLOCK_VERTICALLY}========================================
  //   FREEZE BLOCK - VERTICAL COLLISION DETECTION TEST
  const freezeBlockVertically = () => {
    if (
      current.some(
        (index) =>
          tetBlock[blockData.currentPosition + index + 10].collisionType ===
            "taken-base" ||
          tetBlock[blockData.currentPosition + index + 10].collisionType ===
            "taken"
      )
    ) {
      current.forEach((index) => {
        tetBlock[blockData.currentPosition + index].collisionType = "taken";
      });
      checkForCompleteTakenRow();
      blockData.currentPosition = 4;
      let temp = controlBlocks;
      blockData.currentShape = temp.pop();
      temp.unshift(Math.floor(Math.random()*5));
      setControlBlocks(temp);
      setTimeout(()=>{console.log(controlBlocks)}, 600)
      blockData.currentRotation = 0;
      prevBlockData.prevPosition = blockData.currentPosition;
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
    }
  };
  // ================================END-SECTION-{FREEZE_BLOCK_VERTICALLY}============================================

  // ================================START-SECTION-{CHECK_FOR_COMPLETE_TAKEN_ROW}============================================
  const checkForCompleteTakenRow = () => {
    const clearIndex = [];
    const checkForTaken = (index) => tetBlock[index].collisionType === "taken";
    for (let i = 0; i <= noBlocks - 10; i += 10) {
      const checkArr = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (checkArr.every(checkForTaken)) {
        clearIndex.push(i);
      }
    }
    let clear = false;
    const tempBlock = [];
    clearIndex.forEach((i) => {
      clear = true;
      const slicedBlocks = tetBlock.splice(i, 10);
      tempBlock.push(...slicedBlocks);
      tetBlock.unshift(...slicedBlocks);
      pauseGameLoop = true;
      activateInput = false;
    });
    if(clear){
    animateBlock(tempBlock, PAUSE_TIME);
    setTimeout(() => {
      //RESET THE CLEARED BLOCKS TO DEFAULT
      tempBlock.forEach((grid) => {
        grid.clear();
        grid.collisionType = "";
      });
      drawBlockAfterClearance(tetBlock);
      // activateInput = true;
    }, PAUSE_TIME+10);
    }
  };
  // ================================END-SECTION-{CHECK_FOR_COMPLETE_TAKEN_ROW}============================================

  function drawBlockAfterClearance(tetBlock) {
    // console.log(tetBlock)
    const gridBlocks = [];
    let tempGrid = [];
    for (let i = 0; i < tetBlock.length; i++) {
      tempGrid.push(tetBlock[i]);
      if ((i + 1) % 10 === 0) {
        gridBlocks.push(tempGrid);
        tempGrid = [];
      }
    }
    const { rectSize } = drawingMetrics;
    gridBlocks.forEach((grid, y) => {
      grid.forEach((block, x) => {
        block.position.set(x * rectSize, y * rectSize);
      });
      pauseGameLoop = false;
    });
  }

  const animateBlock =(block, time)=>{
    const tempLoop = setInterval(()=>{
      // WILL CAUSE CLEARED BLOCKS TO MOVE TILL THE LOOP IS DESTORYED
     block.forEach(grid=>{
      grid.x -= 40;
     })
    }, 60);
    setTimeout(()=>{clearInterval(tempLoop)}, time);
  }
  // =================================START-SECTION-{USE_EFFECT}===========================================
  useEffect(() => {
    run && init();
    console.log(controlBlocks)
    return () => {
      clearInterval(gameLoop);
    };
  }, [controlBlocks]);

  // ====================================END-SECTION-{USE_EFFECT}========================================

  // ====================================START-SECTION-{GAME_COMPONENT_FUNCTION_RETURN_STATEMENT}========================================
  return (
    <Background>
      <Monitor tetronimo={tetronimo} controlBlocks={controlBlocks} colorBg={colorBg}/>
      <GameContainer ref={backgroundRef}>
        <InputContainer>
        <KeyListener
        blockData={blockData}
        drawCurrentBlock={drawCurrentBlock}
        undrawCurrentBlock={undrawCurrentBlock}
        current={current}
        tetBlock={tetBlock}
        tetronimo={tetronimo}
        activateInput={activateInput}
      />
        </InputContainer>
      </GameContainer>
    </Background>
  );
  // ====================================END-SECTION-{GAME_COMPONENT_FUNCTION_RETURN_STATEMENT}========================================
}

export default Game;
