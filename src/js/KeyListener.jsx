import React from "react";
import { useRef } from "react";
// import { TiArrowSyncOutline } from "react-icons/ti";


function KeyListener({
  blockData,
  drawCurrentBlock,
  undrawCurrentBlock,
  current,
  tetBlock,
  tetronimo,
  activateInput,
}) {
  const touchCord = useRef({ touchStartX: 0, touchStartY: 0, prevTouch: 0, LAG:100 }).current;
  window.addEventListener("keydown", (e) => {
    // console.log(e.key);
    switch (e.key) {
      case "ArrowLeft":
        activateInput && moveBlockLeft();
        break;
      case "ArrowRight":
        activateInput && moveBlockRight();
        break;
      case "ArrowDown":
        activateInput && moveBlockDown();
        break;
      case "ArrowUp":
        activateInput && changeBlockShapeOrientation();
        break;
      default:
    }
  });

  //   MOVE THE BLOCKS TO THE LEFT
  const moveBlockLeft = () => {
    undrawCurrentBlock();
    let moveLeft = current.some(
      (index) => (index + blockData.currentPosition) % 10 === 0
    );
    if (!moveLeft) {
      blockData.currentPosition -= 1;
    }
    if (
      current.some(
        (index) =>
          tetBlock[index + blockData.currentPosition].collisionType === "taken"
      )
    ) {
      blockData.currentPosition += 1;
    }
    current = tetronimo[blockData.currentShape][blockData.currentRotation];
    drawCurrentBlock();
  };

  const moveBlockRight = () => {
    undrawCurrentBlock();
    let moveLeft = current.some(
      (index) => (index + blockData.currentPosition) % 10 === 9
    );
    if (!moveLeft) {
      blockData.currentPosition += 1;
    }
    if (
      current.some(
        (index) =>
          tetBlock[index + blockData.currentPosition].collisionType === "taken"
      )
    ) {
      blockData.currentPosition -= 1;
    }
    current = tetronimo[blockData.currentShape][blockData.currentRotation];
    drawCurrentBlock();
  };

  const moveBlockDown = () => {
    console.log(activateInput);
    undrawCurrentBlock();
    // CANCEL OUT MOVEMENT CLOSE TO BASE OR ADJACENT BLOCK
    const shouldMoveDown = current.some((index) => {
      return (
        tetBlock[blockData.currentPosition + index + 10].collisionType ===
          "taken-base" ||
        tetBlock[blockData.currentPosition + index + 10].collisionType ===
          "taken"
      );
    });
    if (!shouldMoveDown) {
      blockData.currentPosition += 10;
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
    }
    drawCurrentBlock();
  };

  //   WILL CHANGE THE BLOCK ORIENTATION OR SHAPE
  const changeBlockShapeOrientation = () => {
    // CANCEL OUT ROTATION AT THE EDGES
    undrawCurrentBlock();
    let blockShouldRotate = !(
      current.some((index) => (blockData.currentPosition + index) % 10 === 9) ||
      current.some((index) => (blockData.currentPosition + index) % 10 === 0)
    );
    if (blockData.currentShape === 4) {
      if (
        current.some((index) => (blockData.currentPosition + index) % 10 === 8)
      ) {
        blockShouldRotate = false;
      }
    }

    if (blockShouldRotate) {
      if (blockData.currentRotation < 3) {
        blockData.currentRotation++;
        current = tetronimo[blockData.currentShape][blockData.currentRotation];
        // CANCEL OUT ROTATION CLOSE TO ADJACENT BLOCK
        if (
          current.some(
            (index) =>(tetBlock[blockData.currentPosition + index].collisionType ===
              "taken" ||
            tetBlock[blockData.currentPosition + index].collisionType ===
              "taken-base")
          )
        )
          blockData.currentRotation--;
      } else blockData.currentRotation = 0;
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
    }
    drawCurrentBlock();
  };

  // TOUCH EVENT LISTENERS
  window.addEventListener("touchstart", function (e) {
    const touch = e.touches[0];
    touchCord.touchStartX = touch.clientX;
    touchCord.touchStartY = touch.clientY;
    touchCord.prevTouch = Date.now();
  });
  window.addEventListener("touchmove", function (e) {
    const touch = e.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;
    let {prevTouch, touchStartX, touchStartY, LAG} = touchCord;

    if((Date.now()-prevTouch) <= LAG){
      return;  
    }
    prevTouch = Date.now();
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // HORIZONTAL SWIPE
      if (deltaX > 0) {
        // RIGHT SWIPE
        activateInput && moveBlockRight();
      } else if (deltaX < 0) {
        //LEFT SWIPE
        activateInput && moveBlockLeft();
      }
    } else if (Math.abs(deltaX) < Math.abs(deltaY)) {
      // VERTICAL SWIPE
      if (deltaY > 0) {
        // DOWN SWIPE
        activateInput && moveBlockDown();
      }
    } else if (Math.abs(deltaX) === Math.abs(deltaY)) {
      // TOUCH CLICK NO SWIPE
      activateInput && changeBlockShapeOrientation();
    }
  });

  return <button style={{background: 'black', color: "#fff", padding: '2rem'}} onClick={()=>changeBlockShapeOrientation()}>Switch</button>
}

 export default KeyListener;
