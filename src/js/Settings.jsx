import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiCloseCircleFill } from "react-icons/ri";
import PlayTutorial from './PlayTutorial';
import SoundSettings from './SoundSettings';


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
    font-size: 2rem;
    color: #fff;

    ul{
      list-style: none;
    }

    .enter{
      background-color: #000;
      border: 4px solid #59076d;
      border-radius: 12px;
      margin-block: 0.8rem;
      display: grid;
      place-content: center;
      padding: 10px;
    }

    .enter:hover{
      background-color: #464242;
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


function Settings({setMenu, resumeGame, FX_SOUND1, BgMusic, ScoreFx, LandingFx}) {
  const [openTutorial, setOpenTutorial] = useState(false);
  const [openSoundSettings, setOpenSoundSettings] = useState(false);
  const fxsound = FX_SOUND1.current;
  
  return (
    <MainContainer>
      {
        openTutorial && <PlayTutorial setOpenTutorial={setOpenTutorial} FX_SOUND1={FX_SOUND1}/>
      }
      {
        openSoundSettings && <SoundSettings BgMusic={BgMusic} setOpenSoundSettings={setOpenSoundSettings} FX_SOUND1={FX_SOUND1} ScoreFx={ScoreFx} LandingFx={LandingFx}/>
      }
      <CloseMenu onClick={()=>{setMenu(false); resumeGame(); fxsound.play()}}>
      <RiCloseCircleFill />
      </CloseMenu>
      <ul>
        <li className='enter'><button onClick={()=>{resumeGame(); setMenu(false); fxsound.play()}}>Resume Game</button></li>
        <li className='enter'><button onClick={()=>{setOpenTutorial(true); fxsound.play()}}>How to Play</button></li>
        <li className='enter'>Change Track</li>
        <li className='enter'><button onClick={()=>{setOpenSoundSettings(true); fxsound.play()}}>Sound</button></li>
        <li className='enter'>Controls</li>
        <li className='enter'>Quit</li>
      </ul>
    </MainContainer>
  )
}

export default Settings
