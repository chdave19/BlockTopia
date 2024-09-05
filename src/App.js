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
 }
`
function App() {
  const [openFullScreen, setScreen] = useState(false);
  function fullScreen(){
    const elem = document.documentElement;
    if(elem){
      elem.requestFullscreen();
      setScreen(true);
    }
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
