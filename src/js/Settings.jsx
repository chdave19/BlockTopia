
import React, { useState } from 'react';
import styled from 'styled-components';
import { RiCloseCircleFill } from "react-icons/ri";

const MainContainer = styled.div`
    inset: 0;
    background-color: var(--game-purple);
    display: flex;
    z-index: 9999;
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
`
const CloseMenu = styled.button`
  position: absolute;
  right: 5vw;
  top: 2vh;
  font-size: 3rem;
  color: #b616df;
`


function Settings({setMenu}) {

  return (
    <MainContainer>
      <CloseMenu onClick={()=>setMenu(false)}>
      <RiCloseCircleFill />
      </CloseMenu>
      <ul>
        <li>Pause/Play</li>
        <li>How to Play</li>
        <li>Change Track</li>
        <li>Sound</li>
        <li>Controls</li>
        <li>Quit</li>
      </ul>
    </MainContainer>
  )
}

export default Settings
