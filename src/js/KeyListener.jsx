import { useRef } from "react";

function KeyListener({
    blockData,
    drawCurrentBlock,
    undrawCurrentBlock,
    current,
    tetBlock,
    tetronimo
  }) {
    const touchCord = useRef({touchStartX:0, touchStartY:0}).current;
    window.addEventListener("keydown", (e) => {
      // console.log(e.key);
      switch (e.key) {
        case "ArrowLeft":
          moveBlockLeft();
          break;
        case "ArrowRight":
          moveBlockRight();
          break;
        case "ArrowDown":
          moveBlockDown();
          break;
        case "ArrowUp":
          changeBlockShapeOrientation();
          break;
        default:
      }
    });
  
    //   MOVE THE BLOCKS TO THE LEFT
    const moveBlockLeft = () => {
      undrawCurrentBlock();
      let moveLeft = current.some((index) =>(index + blockData.currentPosition) % 10 === 0);
      if (!moveLeft) {
          blockData.currentPosition -= 1;
      }
      if(current.some(index=>tetBlock[index + blockData.currentPosition].collisionType === "taken")){
          blockData.currentPosition += 1;
      }
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
      drawCurrentBlock();
    };
  
    const moveBlockRight = () => {
      undrawCurrentBlock();
      let moveLeft = current.some((index) =>(index + blockData.currentPosition) % 10 === 9);
      if (!moveLeft) {
          blockData.currentPosition += 1;
      }
      if(current.some(index=>tetBlock[index + blockData.currentPosition].collisionType === "taken")){
          blockData.currentPosition -= 1;
      }
      current = tetronimo[blockData.currentShape][blockData.currentRotation];
      drawCurrentBlock();
    };
  
    const moveBlockDown = () => {
    //   tetBlock.forEach(block=>console.log(block.shadeType))  
      undrawCurrentBlock();
      const shouldMoveDown = current.some(
          (index) =>{
            // console.log(tetBlock[128].collisionType, tetBlock[138].collisionType)
            return tetBlock[blockData.currentPosition + index + 10].collisionType ===
            "taken-base" ||
          tetBlock[blockData.currentPosition + index + 10].collisionType ===
            "taken"
          }
        )
      if(!shouldMoveDown){
      blockData.currentPosition += 10;
      current = tetronimo[blockData.currentShape][blockData.currentRotation]
      } 
      drawCurrentBlock();
    };
  
    //   WILL CHANGE THE BLOCK ORIENTATION OR SHAPE
    const changeBlockShapeOrientation = () => {
      // CANCEL OUT ROTATION AT THE EDGES
      undrawCurrentBlock(); 
      let blockShouldRotate = !((current.some((index) => (blockData.currentPosition + index) % 10 === 9)) ||
      (current.some((index) => (blockData.currentPosition + index) % 10 === 0)))
      if(blockData.currentShape===4){
        if(current.some(index=>((blockData.currentPosition + index) % 10 === 8))){
         blockShouldRotate = false;
        }
      }
      
      if (blockShouldRotate) {
        blockData.currentRotation<3? blockData.currentRotation++:blockData.currentRotation=0;
        current = tetronimo[blockData.currentShape][blockData.currentRotation];
      }
      drawCurrentBlock();
    };

    // TOUCH EVENT LISTENERS
   window.addEventListener('touchstart', function(e){
    const touch = e.touches[0];
    touchCord.touchStartX = touch.clientX;
    touchCord.touchStartY = touch.clientY;
   });
   window.addEventListener('touchmove', function(e){
    const touch = e.touches[0];
    const touchEndX = touch.clientX;
    const touchEndY = touch.clientY;

    const deltaX = touchEndX - touchCord.touchStartX;
    const deltaY = touchEndY - touchCord.touchStartY;

    if(Math.abs(deltaX) > Math.abs(deltaY)){
      // HORIZONTAL SWIPE
      if(deltaX >0){
        // RIGHT SWIPE
        moveBlockRight();
      }else if(deltaX<0) {
        //LEFT SWIPE
        moveBlockLeft();
      }
    }else if(Math.abs(deltaX) < Math.abs(deltaY)){
      // VERTICAL SWIPE
      if(deltaY>0){
        // DOWN SWIPE
        moveBlockDown();
      }
    }else if(Math.abs(deltaX) === Math.abs(deltaY)){
      // TOUCH CLICK NO SWIPE
      changeBlockShapeOrientation();
    }
   })
  }
  
  export default KeyListener;
  