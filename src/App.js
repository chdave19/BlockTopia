import styled from 'styled-components';
import './App.css';
import Game from './js/Game';
import { useEffect, useState } from 'react';

const OpenScreen = styled.div`
 height: 100vh;
 width: 100vw;
 background-color: #000;
 display: ${props=>props.$fullscreen?'none':'grid'};
 place-content: center;
 position: fixed;
 inset: 0;
 z-index: 9999;
 button{
  padding: 1rem;
  color: #fff;
  background-color: purple;
  font-size: 2rem;
  font-family: 'Gasalt-Black';
 }
`
function App() {
  const [openFullScreen, setScreen] = useState(false);

  function fullScreen(){
    const elem = document.documentElement;
    elem.requestFullscreen();
    setScreen(true);
    // if(elem.requestFullscreen){
    //   elem.requestFullscreen();
    //   setScreen(true);
    // }else if(elem.webkitOpenFullScreen){
    //   elem.webkitOpenFullScreen();
    //   setScreen(true);
    // }
  }
  useEffect(()=>{
    
  }, [])
  return (
   <>
   <OpenScreen $fullscreen={openFullScreen}>
    <button onClick={()=>fullScreen()}>Play</button>
   </OpenScreen>
   {
    openFullScreen && <Game/>
   }
   </>
  );
}

export default App;
