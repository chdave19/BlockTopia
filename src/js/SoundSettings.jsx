import React from "react";
import styled from "styled-components";
import { Howl, Howler } from "howler";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import { IoVolumeMute } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";

const MainContainer = styled.div`
  inset: 0;
  background-color: var(--game-purple);
  display: flex;
  z-index: 9;
  position: fixed;
  justify-content: center;
  align-items: center;
  font-family: "Gasalt-Black";
  font-size: 2.5rem;
  color: #fff;

  ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  li {
    background-color: #000;
    border: 4px solid #59076d;
    border-radius: 12px;
    margin-block: 0.8rem;
    display: flex;
    gap: 2rem;
    padding: 10px;
    align-items: center;
    width: 80vw;
    justify-content: space-between;
  }
  .enter div{
    display: flex;
    gap: 2px;
  }

  .enter div button{
    background-color: #434040;
    padding: .8rem;
    border-radius: 8px;
    display: grid;
    place-content: center;
    border: 2px solid #ffffff;
  }

`;

const BackButton = styled.button`
  position: fixed;
  left: 5vw;
  top: 2vh;
  color: #b611c2;
  font-size: 3rem;
`;

function SoundSettings({ BgMusic, setOpenSoundSettings, FX_SOUND1 }) {
  const fxsound = FX_SOUND1.current;  
  return (
    <MainContainer>
      <BackButton onClick={()=>{setOpenSoundSettings(false); fxsound.play();}}><RiArrowLeftCircleFill/></BackButton>  
      <ul>
        <li className="enter">
          <span>Music</span>
          <div>
            <button >On</button>
            <button >Off</button>
          </div>
        </li>
        <li className="enter">
        <span>SFX</span>
          <div>
            <button>On</button>
            <button>Off</button>
          </div>
        </li>
        <li className="enter">
        <span>Mute</span>
          <div>
            <button onClick={()=>{Howler.mute(true); fxsound.play()}} className="mute"><IoVolumeMute/></button>
            <button onClick={()=>{Howler.mute(false); fxsound.play()}} className='mute'><GoUnmute/></button>
          </div>
        </li>
      </ul>
    </MainContainer>
  );
}

export default SoundSettings;
