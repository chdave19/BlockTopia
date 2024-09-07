import React from "react";
import BottomControl from "../img/bottom-control.png";
import CSO from "../img/change-shape-orientation.png";
import ControlBlocks from "../img/control-blocks.png";
import End from "../img/end.png";
import HTPI from "../img/how-to-play-intro.png";
import Left from "../img/left-control.png";
import Right from "../img/right-control.png";
import Score from "../img/score.png";
import styled from "styled-components";
import { RiArrowLeftCircleFill } from "react-icons/ri";

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
const Main = styled.div``;
const SlideContainer = styled.main`
  height: 100%;
  width: fit-content;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;

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
`;
const SlideContent = styled.div`
 border-radius: 12px;
 border: 4px solid #59076d;
 background-color: #000;
 display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.6rem;
  width: 70%;
  height: fit-content;
  padding: 0.8rem;
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

const ImageWrapper = styled.figure`
    img{
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
`
function PlayTutorial({ setOpenTutorial }) {
  return (
    <MainContainer>
      <BackButton title="go back" onClick={() => setOpenTutorial(false)}>
        <RiArrowLeftCircleFill />
      </BackButton>
      <Main>
        <SlideContainer>
          <SlideWrapper>
            <SlideHeader><h1>How to play BlockTopia</h1></SlideHeader>
            <SlideContent>
                <ImageWrapper>
                    <img src={HTPI} alt=""/>
                </ImageWrapper>
                <p>
                    BlockTopia was inspired by the original Tetris game. It is all about
                    moving 2D blocks around the environment. The aim of the game is to score 
                    as many points before the building blocks plunges into the sky. Never let the
                    building become too high. The game doesn't likes tall buildings. To make your building small as possible,
                    try to complete a row to eliminate blocks. You can eliminate 2 or more rows at the same time, it all
                    depends on your capability as a block builder of BlockTopia. Let us learn how to move 
                    like a BlockTopian.
                </p>
            </SlideContent>
          </SlideWrapper>
        </SlideContainer>
        <SlideButton></SlideButton>
      </Main>
    </MainContainer>
  );
}

export default PlayTutorial;
