import React from 'react'
import { Application, Container, FillGradient, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MonitorContainer = styled.div`
    margin-bottom: 1rem;
    border: 4px solid #680779;
`
function Monitor({tetronimo, controlBlocks, colorBg}) {
  let gameScale = useRef(window.innerWidth < 450 ? 0.9 : 0.8).current;
  let monitorRef = useRef();
  let blocksArr = useRef([]).current;
  let start = useRef(true).current;


  async function init(){
   start = false;  
   const app = new Application();
   await app.init({
    preserveDrawingBuffer: true,
    width: gameScale * window.innerWidth,
    height: 100,
    antialias: true,
   });
   monitorRef.current.appendChild(app.canvas);
   
//    INITIALIZE THE BLOCKS
   const blockSize = app.canvas.height/4;
   const xBlocks = Math.floor(app.canvas.width/blockSize + 2);
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
        // graphics.rect(0,0,blockSize,blockSize).fill(`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`)
    })
   })
   let offset = 1;
   blocksArr.forEach(block=>block.clear())
   controlBlocks.forEach(index=>{
    tetronimo[index][0].forEach(value=>{
        const rectGradient = new FillGradient(0,0,blockSize/2,blockSize/2);
        colorBg[index].forEach((value, index)=>{
            rectGradient.addColorStop(index, value);
        });
        blocksArr[value+offset].roundRect(0,0,blockSize,blockSize, 4).fill(rectGradient).stroke({length: 4, color: '#000'});
       });
       offset += 6;   
   })
  }  

  useEffect(()=>{
   start && init();
   console.log('changed')
  }, [controlBlocks])  
  return (
    <MonitorContainer ref={monitorRef}>
      
    </MonitorContainer>
  )
}

export default Monitor
