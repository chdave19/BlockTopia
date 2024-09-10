import styled from "styled-components";
import "./App.css";
import Game from "./js/Game";
import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";
import Sound1 from "./sounds/sound1.wav";
import Lion from "./sounds/lionheart.mp3";
import UI_CLICK1 from "./sounds/ui-click-1.mp3";
import BgMusic1 from "./sounds/bg-music-1.mp3";

const OpenScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000;
  display: ${(props) => (props.$fullscreen ? "none" : "grid")};
  place-content: center;
  position: fixed;
  inset: 0;
  z-index: 9999;
  button {
    padding: 1rem;
    color: #fff;
    background-color: purple;
    font-size: 2rem;
    font-family: "Gasalt-Black";
  }
`;
function App() {
  const [openFullScreen, setScreen] = useState(false);
  const FX_SOUND1 = useRef(
    new Howl({
      src: [UI_CLICK1],
      preload: true,
    })
  );
  const BgMusic = useRef(
    new Howl({
      src: [BgMusic1],
      sprite: {
        bgmusic: [0, 30000],
      },
      loop: true,
      preload: true,
    })
  );

  function fullScreen() {
    const sound = FX_SOUND1.current;
    sound.play();
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")) === null ||
      JSON.parse(localStorage.getItem("soundSettingsData")).music
    )
      BgMusic.current.play("bgmusic");
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      setScreen(true);
    } else if (elem.webkitOpenFullScreen) {
      elem.webkitOpenFullScreen();
      setScreen(true);
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <OpenScreen $fullscreen={openFullScreen}>
        <button onClick={() => fullScreen()}>Play</button>
      </OpenScreen>
      {openFullScreen && <Game FX_SOUND1={FX_SOUND1} BgMusic={BgMusic} />}
    </>
  );
}

export default App;
