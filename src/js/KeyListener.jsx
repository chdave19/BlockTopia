import React, { useEffect } from "react";
import { useRef } from "react";
// import { TiArrowSyncOutline } from "react-icons/ti";
import { TbArrowBigLeftLinesFilled, TbArrowBigRightLinesFilled, TbArrowBigDownLinesFilled } from "react-icons/tb";
import { LuRefreshCw } from "react-icons/lu";
import styled from "styled-components";


const IconWrapper = styled.div`
  font-size: 4rem;
  width: 100%;
  height: 100%;
  color: #160918;
  position: relative;
  button{
    font-size: inherit;
    color: #c20fe6;
    outline: none;
    background-color: transparent;
    border: none;
    position: absolute;
    cursor: pointer;
    display: grid;
    place-content: center;
  }
  button:is(:hover){
    color: #ebdaed;
  }
  button:first-child{
    top: -8px;
    left: 15%;
  }
  button:nth-child(2){
    top: -8px;
    left: calc(85% - 4rem);
  }
  button:nth-child(3){
    left: calc(50% - 2rem);
    top: 120%;
  }
  button:nth-child(4){
    left: calc(50% - 2rem);
    top: -8px;
  }
`
function KeyListener({
  blockData,
  drawCurrentBlock,
  undrawCurrentBlock,
  current,
  tetBlock,
  tetronimo,
  activateInput,
}) {
  const touchCord = useRef({ touchStartX: 0, touchStartY: 0, prevTouch: 0, LAG:500 }).current;
  let allowControl = useRef({left: false, right: false, up: false, down: false}).current;
  window.addEventListener("keydown", (e) => {
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

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        allowControl.left = false;
        break;
      case "ArrowRight":
        allowControl.right = false;
        break;
      case "ArrowDown":
        allowControl.down = false;
        break;
      case "ArrowUp":
        allowControl.up = false;
        break;
      default:
    }
  });

  //   MOVE THE BLOCKS TO THE LEFT
  const moveBlockLeft = () => {
    if(!allowControl.left){
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
    // allowControl.left = true;
    }
  };

  const moveBlockRight = () => {
    if(!allowControl.right){
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
    // allowControl.right = true;
    }
  };

  const moveBlockDown = () => {
    if(!allowControl.down){
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
    // allowControl.down = true;
    }
  };

  //   WILL CHANGE THE BLOCK ORIENTATION OR SHAPE
  const changeBlockShapeOrientation = () => {
    if(!allowControl.up){
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
    // allowControl.up = true;
    }
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

   useEffect(()=>{}, []);

  return <IconWrapper>
    <button onClick={()=>moveBlockLeft()}><TbArrowBigLeftLinesFilled/></button>
    <button onClick={()=>moveBlockRight()}><TbArrowBigRightLinesFilled/></button>
    <button onClick={()=>moveBlockDown()}><TbArrowBigDownLinesFilled/></button>
    <button onClick={()=>changeBlockShapeOrientation()}><LuRefreshCw/></button>
  </IconWrapper>
}

 export default KeyListener;
