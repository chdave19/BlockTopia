
import React, { useState } from 'react';
import styled from 'styled-components';
import { RiCloseCircleFill } from "react-icons/ri";
import PlayTutorial from './PlayTutorial';

const MainContainer = styled.div`
    inset: 0;
    background-color: var(--game-purple);
    display: flex;
    z-index: 9;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    align-items: center;
    font-family: 'Gasalt-Black';
    font-size: 2.5rem;
    color: #fff;

    ul{
      list-style: none;
    }

    li{
      background-color: #000;
      border: 4px solid #59076d;
      border-radius: 12px;
      margin-block: 0.8rem;
      display: grid;
      place-content: center;
      padding: 10px;
    }

    .enter button{
      color: inherit;
      font-size: inherit;
      font-family: inherit;
    }
`
const CloseMenu = styled.button`
  position: absolute;
  right: 5vw;
  top: 2vh;
  font-size: 3rem;
  color: #b616df;
`


function Settings({setMenu, pauseGameLoop}) {
  const [openTutorial, setOpenTutorial] = useState(false);

  return (
    <MainContainer>
      {
        openTutorial && <PlayTutorial setOpenTutorial={setOpenTutorial}/>
      }
      <CloseMenu onClick={()=>{setMenu(false); pauseGameLoop()}}>
      <RiCloseCircleFill />
      </CloseMenu>
      <ul>
        <li className='enter'><button onClick={()=>{pauseGameLoop(); setMenu(false)}}>Pause/Play</button></li>
        <li className='enter'><button onClick={()=>{pauseGameLoop(); setOpenTutorial(true)}}>How to Play</button></li>
        <li>Change Track</li>
        <li>Sound</li>
        <li>Controls</li>
        <li>Quit</li>
      </ul>
    </MainContainer>
  )
}

export default Settings
