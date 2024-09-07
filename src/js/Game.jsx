import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Application, Graphics, Container, FillGradient } from "pixi.js";
import KeyListener from "./KeyListener";
import Monitor from "./Monitor";
import { IoSettingsSharp } from "react-icons/io5";
import Settings from "./Settings";
import MainBg2 from '../img/main-bg-5.jpg';
import ScoreMusic from '../sounds/score-fx.mp3';
import {Howl, Howler} from 'howler';
import LandMusic from '../sounds/fall-fx.wav';
 


const Background = styled.div`
  /* background-color: var(--game-purple); */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 4px solid #59076d;
`;
const GameContainer = styled.div`
 border: 4px solid #59076d;
 border-radius: 12px;
`;

const BackgroundImage = styled.figure`
  position: fixed;
  z-index: -1;
  height: 100vh;
  width: 100vw;
  inset: 0;

  img{
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
  }
`

const InputContainer = styled.div`
  position: fixed;
  bottom: 8%;
  width: 90vw;
  background-color: #2c0e34b9;
  left: 5vw;
  height: 50px;
  display: flex;
  border: 4px solid #59076d;
  border-radius: 12px;
  justify-content: center;
`
const ScoreWrapper = styled.div`
 border: 2px solid #59076d;
 border-radius: 12px;
 position: fixed;
 left: 5vw;
 top: 1vh;
 background-color: #000;
 color: #fff;
 display: flex;
 align-items: center;
 padding: 0.5rem;
 font-family: 'Gasalt-Black';
 font-size: 1.2rem;
 span{
  font-size: 3rem;
  font-weight: 600;
  margin-left: 10px;
 }
`
const MenuButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 3rem;
  color: #8b0cab;
  position: fixed;
  top: 2vh;
  right: 5vw;
`

function Game({FX_SOUND1, BgMusic}) {
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
    currentShape: Math.floor(Math.random()*5),
    currentRotation: 0,
  }).current;

  const prevBlockData = useRef({
    prevPosition: 99,
    prevShape: 4,
    prevRotation: 0,
  });

  const colorBg = [
    ["#6dfa51", "#0cab06"],
    ["#910ca9", "#e122fa"],
    ["#fdfd55", "#c5d90e"],
    ["#168cfa", "#30dde7"],
    ["#f11010", "#e33f3f"],
  ];

  let gameLoop = useRef().current;
  let gameScale = useRef(window.innerWidth < 450 ? 0.9 : 0.8).current;
  let current = useRef(
    tetronimo[blockData.currentShape][blockData.currentRotation]
  ).current;
  let noBlocks = useRef(130).current;
  let aspectRatio = useRef(noBlocks / 100).current;
  let drawingMetrics = useRef({}).current;
  const pauseGameLoop = useRef(false);
  let activateInput = useRef(true);
  let PAUSE_TIME = useRef(2000).current;
  const [controlBlocks, setControlBlocks] = useState(
    [
      Math.floor(Math.random()*5),
      Math.floor(Math.random()*5),
    ]
  )
  const [run, setRun] = useState(true);
  const controlBlockRef = useRef(controlBlocks);
  const [playerScore, setPlayerScore] = useState(0);
  const [openSettings, setMenu] = useState(false);
  const shouldMoveBlock = useRef(true);
  const ScoreFx = useRef(new Howl({
    src: [ScoreMusic],
    preload: true,
  }));
  const LandingFx = useRef(new Howl({
    src: [LandMusic],
    preload: true,
  }));
  // =====================================END-SECTION-{VARIABLES}=======================================

  // =====================================START-SECTION-{INIT}=======================================
  const init = async () => {
    setRun(false);
    const app = new Application();
    await app.init({
      preserveDrawingBuffer: true,
      width: gameScale * Window.width,
      height: gameScale * Window.width * aspectRatio,
      antialias: true,
      backgroundAlpha: 1,
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

    gameLoop = setInterval(() => {
      !pauseGameLoop.current && moveBlock();
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
    undrawCurrentBlock();
    drawCurrentBlock();
    checkForGameOver();
    freezeBlockVertically();
    if(shouldMoveBlock.current) blockData.currentPosition += 10;
  };
  // ==================================END-SECTION-{MOVE_BLOCK}==========================================

  // ===================================START-SECTION-{DRAW-CURRENT_BLOCK}=========================================
  /**
   * @param {Function} drawCurrentBlock - drawFunction
   * WILL DRAW THE CURRENT BLOCK INCASE ANY OF THE BLOCK DATA IS MODIFIED
   * CAN CAUSE PERFOMANCE ISSUES IF NOT USED PROPERLY
   */
  const drawCurrentBlock = () => {
    shouldMoveBlock.current = true;
    current = tetronimo[blockData.currentShape][blockData.currentRotation];
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
    prevBlockData.current.prevPosition = blockData.currentPosition;
    prevBlockData.current.prevRotation = blockData.currentRotation;
    prevBlockData.current.prevShape = blockData.currentShape;
  };

  // ================================END-SECTION-{DRAW_CURRENT_BLOCK}============================================

  // =================================START-SECTION-{UNDRAW_CURRENT_BLOCK}===========================================
  /**
   * @param {Function} undrawCurrentBlock - undrawFunction
   * WILL UNDRAW THE CURRENT BLOCK INCASE ANY OF THE BLOCK DATA IS MODIFIED
   * SHOULD BE USED ALONG WITH THE DRAW_CURRENT_BLOCK FUNCTION
   */
  const undrawCurrentBlock = () => {
    const currentBlock = tetronimo[prevBlockData.current.prevShape][prevBlockData.current.prevRotation];
    currentBlock.forEach((value) => {
      tetBlock[prevBlockData.current.prevPosition + value].clear();
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
      LandingFx.current.play();
      current.forEach((index) => {
        tetBlock[blockData.currentPosition + index].collisionType = "taken";
      });
      checkForCompleteTakenRow();
      blockData.currentPosition = 4;
      let temp = [...controlBlockRef.current];
      blockData.currentShape = temp.pop();
      temp.unshift(Math.floor(Math.random()*5));
      setControlBlocks(temp);
      blockData.currentRotation = 0;
      prevBlockData.current.prevPosition = blockData.currentPosition;
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
      shouldMoveBlock.current = false;
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
        setPlayerScore(prev=>prev+100);
      }
    }
    let clear = false;
    const tempBlock = [];
    clearIndex.forEach((i) => {
      clear = true;
      const slicedBlocks = tetBlock.splice(i, 10);
      tempBlock.push(...slicedBlocks);
      tetBlock.unshift(...slicedBlocks);
      pauseGameLoop.current = true;
      activateInput.current = false;
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
      activateInput.current = true;
    }, PAUSE_TIME+10);
    }
  };
  // ================================END-SECTION-{CHECK_FOR_COMPLETE_TAKEN_ROW}============================================

  function drawBlockAfterClearance(tetBlock) {
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
      pauseGameLoop.current = false;
    });
  }

  const animateBlock =(block, time)=>{
    ScoreFx.current.play();
    BgMusic.current.volume(0.3);
    const tempLoop = setInterval(()=>{
      // WILL CAUSE CLEARED BLOCKS TO MOVE TILL THE LOOP IS DESTROYED
     block.forEach(grid=>{
      grid.x -= 40;
     })
    }, 60);
    setTimeout(()=>{clearInterval(tempLoop); BgMusic.current.volume(1);}, time);
  }

  const pauseGame =()=>{
    pauseGameLoop.current = true;
    activateInput.current = false;
  }

  const resumeGame =()=>{
    pauseGameLoop.current = false;
    activateInput.current = true;
  }

  const checkForGameOver =()=>{
    for(let i=0; i<current.length; i++){
      if(tetBlock[blockData.currentPosition+current[i]+10].collisionType==='taken' && blockData.currentPosition===4){
        pauseGame();
        break;
      }
    }
  }

  // const setPlayerScore =()=>{

  // }

  // =================================START-SECTION-{USE_EFFECT}===========================================
  useEffect(() => {
    controlBlockRef.current = controlBlocks;
    run && init();
    
    return () => {
      clearInterval(gameLoop);
    };
  }, [controlBlocks, run]);

  // ====================================END-SECTION-{USE_EFFECT}========================================

  // ====================================START-SECTION-{GAME_COMPONENT_FUNCTION_RETURN_STATEMENT}========================================
  return (
    <Background>
      <BackgroundImage><img src={MainBg2} alt="" /></BackgroundImage>
      <ScoreWrapper>Score: <span>{playerScore}</span></ScoreWrapper>
      <MenuButton onClick={()=>{setMenu(true); pauseGame(); FX_SOUND1.current.play()}}><IoSettingsSharp/></MenuButton>
      <Monitor tetronimo={tetronimo} controlBlocks={controlBlocks} colorBg={colorBg} pauseGameLoop={pauseGameLoop}/>
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
      {
        openSettings && <Settings setMenu={setMenu} resumeGame={resumeGame} FX_SOUND1={FX_SOUND1} BgMusic={BgMusic}/>
      }
    </Background>
  );
  // ====================================END-SECTION-{GAME_COMPONENT_FUNCTION_RETURN_STATEMENT}========================================
}

export default Game;
