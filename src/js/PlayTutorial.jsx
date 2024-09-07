import React, { useEffect, useState } from "react";
import BottomControl from "../img/bottom-control.png";
import CSO from "../img/change-shape-orientation.png";
import ControlBlocks from "../img/control-blocks.png";
import End from "../img/end.png";
import HTPI from "../img/how-to-play-intro.png";
import Left from "../img/left-control.png";
import Right from "../img/right-control.png";
import Score from "../img/score.png";
import styled from "styled-components";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

const MainContainer = styled.div`
  background-color: var(--game-purple);
  position: fixed;
  inset: 0;
  z-index: 99;
  font-family: "Gasalt-Regular";
  color: #fff;
  font-size: 1rem;
`;
const BackButton = styled.button`
  position: fixed;
  left: 5vw;
  top: 2vh;
  color: #b611c2;
  font-size: 3rem;
`;
const Main = styled.div`
`;
const SlideContainer = styled.main`
  height: 100%;
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  transition: 600ms;
  transform: ${({$index})=>`translateX(${$index*-100}vw)`};
  pointer-events: none;
  
`;
const SlideWrapper = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;
const SlideHeader = styled.div`
  border-radius: 12px;
  border: 4px solid #59076d;
  background-color: #000;
  text-align: center;
  padding: 1rem;
  width: 86%;
`;
const SlideContent = styled.div`
 border-radius: 12px;
 border: 4px solid #59076d;
 background-color: #000;
 display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.6rem;
  width: 86%;
  height: fit-content;
  padding: 0.8rem;
  pointer-events: none;
`;
const SlideButton = styled.div`
  position: fixed;
  width: 60vw;
  left: calc(50vw - 30vw);
  bottom: 10px;
  border-radius: 12px;
  border: 4px solid #59076d;
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PageNo = styled.span`
    position: fixed;
    font-size: 1.5rem;
    left: calc(50vw - 0.75rem);
    bottom: 80px;
`

const ImageWrapper = styled.figure`
    img{
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
`
const Button = styled.button`
 color: #b611c2;
 font-size: 3rem;
 display: grid;
 place-content: center;

 &:hover{
    color: #531058;
    background-color: transparent;
 }
`
function PlayTutorial({ setOpenTutorial }) {
 const [transformIndex, setTransformIndex] = useState(0);


//  useEffect(()=>{
//   console.log(transformIndex)  
//  })

  return (
    <MainContainer>
      <BackButton title="go back" onClick={() => setOpenTutorial(false)}>
        <RiArrowLeftCircleFill />
      </BackButton>
      <Main>
        <SlideContainer $index={transformIndex}>
          <SlideWrapper>
            <SlideHeader><h1>How to play BlockTopia</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={HTPI} alt=""/>
                </ImageWrapper>
                <p>
                BlockTopia draws inspiration from the classic Tetris game, where you manipulate 2D
                 blocks in a vibrant environment. The goal is simple: score as many points as possible
                  before the tower of blocks rises into the sky. Tall buildings are not welcome here! 
                  Keep your tower low by completing rows to clear blocks. If you're skilled, you can 
                  clear multiple rows at once, showcasing your prowess as a BlockTopian builder. Ready
                   to learn the art of block maneuvering and master BlockTopia? Let’s get started!
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Controls - Left</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={Left} alt=""/>
                </ImageWrapper>
                <p>
                The game offers two control modes: physical buttons and touchscreen controls.
                Both modes work the same way, allowing you to easily interact with the falling blocks. Press the left arrow
                 (physical button) or tap the left button (touchscreen). This shifts the block one unit to the left.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Controls - Right</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={Right} alt=""/>
                </ImageWrapper>
                <p>
                Press the right arrow or tap the right button to move the block one unit to the right.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Controls - Bottom</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={BottomControl} alt=""/>
                </ImageWrapper>
                <p>
                Press the down arrow or tap the down button. This increases the speed of the block's descent but still allows time for adjustments.
                You can also quickly drop the block to the bottom by holding down the down control or tapping and holding the screen control.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Controls - Change Shape Orientation</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={CSO} alt=""/>
                </ImageWrapper>
                <p>
                Press the rotation button or tap the corresponding on-screen button. This rotates the block 90 degrees clockwise, allowing you to fit it into different positions.
                Mastering these controls is key to stacking the blocks efficiently and clearing rows. Whether you prefer using physical buttons or tapping the touchscreen, the controls are intuitive and designed for smooth gameplay.
                You can switch the game control modes in the settings menu based on what you are comfortable with.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Control Blocks</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={ControlBlocks} alt=""/>
                </ImageWrapper>
                <p>
                In BlockTopia, like classic Tetris, there's a preview area that shows the next 2-3 blocks.
                 This feature allows you to strategize ahead by knowing which blocks are coming, giving you
                  time to plan your moves more effectively. By utilizing this preview, you can position current
                   blocks to prepare for future ones, increasing your chances of clearing multiple rows.
                    Mastering this foresight is key to keeping your tower low and maximizing your score as you progress in the game.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>Scoring Pattern</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={Score} alt=""/>
                </ImageWrapper>
                <p>
                In BlockTopia, scoring is based on how many rows you clear. For every row you successfully
                 eliminate, you earn 10 points. The more rows you clear at once, the more points you rack
                  up, allowing you to boost your score quickly. Clearing two rows at a time doubles your
                   points, and clearing more rows together earns you even more. By strategically placing
                    blocks and completing rows efficiently, you can maximize your score and dominate the game.
                </p>
            </SlideContent>
          </SlideWrapper>
          <SlideWrapper>
            <SlideHeader><h1>The End</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={End} alt=""/>
                </ImageWrapper>
                <p>
                BlockTopia offers an exciting, strategic take on the classic Tetris game. By
                 mastering the controls and utilizing the preview of upcoming blocks, you 
                 can carefully plan your moves and score points by clearing rows. Each row
                  cleared earns you 10 points, and with skillful play, you can eliminate
                   multiple rows at once for even higher scores. Stay focused, keep your 
                   tower low, and rise to the challenge of becoming a top-tier BlockTopian
                    builder. Enjoy the game and aim for high scores!
                </p>
            </SlideContent>
          </SlideWrapper>
        </SlideContainer>
        <PageNo>{transformIndex+1}/8</PageNo>
        <SlideButton>
         <Button onClick={()=>transformIndex<=0?setTransformIndex(7):setTransformIndex(prev=>prev-1)}><RiArrowLeftCircleFill /></Button>
         <Button onClick={()=>transformIndex>=7?setTransformIndex(0):setTransformIndex(prev=>prev+1)}><RiArrowRightCircleFill /></Button>
        </SlideButton>
      </Main>
    </MainContainer>
  );
}

export default PlayTutorial;
