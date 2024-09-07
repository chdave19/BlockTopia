import React, { useState } from 'react'
import { Application, Container, FillGradient, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MonitorContainer = styled.div`
    border: 4px solid #680779;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    background-color: black;
`
function Monitor({tetronimo, controlBlocks, colorBg, pauseGameLoop}) {
  let gameScale = useRef(window.innerWidth < 450 ? 0.9 : 0.8).current;
  let monitorRef = useRef();
  let blocksArr = useRef([]).current;
  const [run, setRun] = useState(true);
  let canvasRef = useRef(null).current;
  const blockData = useRef({blockSize: null, xBlocks: null}).current;
  let currentScale = useRef(1).current;
  


  async function init(){
   const app = new Application();
   await app.init({
    preserveDrawingBuffer: true,
    width: gameScale * window.innerWidth,
    height: 100,
    antialias: true,
   });
   monitorRef.current.appendChild(app.canvas);
   canvasRef = app;
//    INITIALIZE THE BLOCKS
   blockData.blockSize = app.canvas.height/4;
   blockData.xBlocks = Math.floor(app.canvas.width/blockData.blockSize + 2);
   const blockSize = blockData.blockSize;
   const xBlocks = blockData.xBlocks;
   let tempArr = [];
   const mainArr = [];
   for(let i=1; i<=(xBlocks*5); i++){
    tempArr.push(new Graphics());
    if(i%10===0 || i===(xBlocks*5)-1){
        mainArr.push(tempArr);
        tempArr = [];
    }
   }
   const blockContainer = new Container({x: (app.canvas.width-blockSize*10)/2, y:0});
   app.stage.addChild(blockContainer);
   mainArr.forEach((arr, j)=>{
    arr.forEach((graphics, i)=>{
        blockContainer.addChild(graphics);
        blocksArr.push(graphics);
        graphics.position.set(i*blockSize, j*blockSize);
    })
   });
   drawTetro();
    app.ticker.maxFPS = app.ticker.minFPS = 10;
    app.ticker.add(delta=>{
       if(!pauseGameLoop.current){
        blocksArr.forEach(graphics=>{
            graphics.scale.set(currentScale);
            if(currentScale>=1.3)currentScale=1;
            currentScale += 0.01*delta.deltaTime;
        })
       }
    })
  }
  
  const drawTetro =()=>{
   blocksArr.forEach(block=>block.clear());
   let offset = 1;
   blocksArr.forEach(block=>block.clear())
   controlBlocks.forEach(index=>{
    tetronimo[index][0].forEach(value=>{
        const blockSize = blockData.blockSize;
        const rectGradient = new FillGradient(0,0,blockSize/2,blockSize/2);
        colorBg[index].forEach((value, index)=>{
            rectGradient.addColorStop(index, value);
        });
        blocksArr[value+offset].roundRect(0,0,blockSize,blockSize, 4).fill(rectGradient).stroke({length: 4, color: '#000'});
       });
       offset += 6;   
   });
   setRun(false); 
  }

  useEffect(()=>{
   run && init();
   !run && drawTetro();
  }, [controlBlocks, run])  
  return (
    <MonitorContainer ref={monitorRef}>
      
    </MonitorContainer>
  )
}

export default Monitor
