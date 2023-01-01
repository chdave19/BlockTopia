import styled from "styled-components";
import "./App.css";
import Game from "./js/Game";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { Howl} from "howler";
import UI_CLICK1 from "./sounds/ui-click-1.mp3";
import BgMusic1 from "./sounds/bg-music-1.mp3";
import BgMusic2 from "./sounds/bg-music-2.mp3";
import BgMusic3 from "./sounds/bg-music-3.mp3";
import BgMusic4 from "./sounds/bg-music-4.mp3";
import BgMusic5 from "./sounds/bg-music-5.mp3";

export const TrackContext = React.createContext(null);

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
  const BgMusic = useRef();

  const track1 = useRef({
    title: "Get Over Me",
    sound: new Howl({
      src: [BgMusic1],
      preload: true,
      loop: true,
      sprite: {
        bgmusic: [0, 30000],
      },
    }),
  });
  const track2 = useRef({
    title: "Pacifier",
    sound: new Howl({
      src: [BgMusic2],
      preload: true,
      loop: true,
      sprite: {
        bgmusic: [0, 30000],
      },
    }),
  });
  const track3 = useRef({
    title: "Renegrade",
    sound: new Howl({
      src: [BgMusic3],
      preload: true,
      loop: true,
      sprite: {
        bgmusic: [0, 30000],
      },
    }),
  });
  const track4 = useRef({
    title: "The Scepter",
    sound: new Howl({
      src: [BgMusic4],
      preload: true,
      loop: true,
      sprite: {
        bgmusic: [0, 30000],
      },
    }),
  });
  const track5 = useRef({
    title: "Let's Roll",
    sound: new Howl({
      src: [BgMusic5],
      preload: true,
      loop: true,
      sprite: {
        bgmusic: [0, 26000],
      },
    }),
  });

  const tracks = useRef([track1, track2, track3, track4, track5])
  
  function setTrackName(trackType){
    BgMusic.current = trackType.current;
     let soundSettingsData = JSON.parse(
      localStorage.getItem("soundSettingsData")
    );
    soundSettingsData = {
      ...soundSettingsData,
      music: true,
      sfx: true,
      BgTrackName: trackType.current.title,
    };
    localStorage.setItem(
      "soundSettingsData",
      JSON.stringify(soundSettingsData)
    );
    BgMusic.current.sound.play("bgmusic");
  }

  function fullScreen() {
    /*
    Track1 - Get Over Me
    Track2 - Pacifier
    Track3 - Renegrade
    Track4 - The Scepter
    Track5 - Let's Roll
    */
    const sound = FX_SOUND1.current;
    sound.play();
    if (JSON.parse(localStorage.getItem("soundSettingsData")) === null){
     setTrackName(track1);
    }else if(JSON.parse(localStorage.getItem("soundSettingsData")).music){
     switch(JSON.parse(localStorage.getItem('soundSettingsData')).BgTrackName){
      case 'Get Over Me': setTrackName(track1);break;
      case 'Pacifier': setTrackName(track2);break;
      case 'Renegrade': setTrackName(track3);break;
      case 'The Scepter': setTrackName(track4);break;
      case "Let's Roll": setTrackName(track5);break;
      default:
     }
    }
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      setScreen(true);
    } else if (elem.webkitOpenFullScreen) {
      elem.webkitOpenFullScreen();
      setScreen(true);
    }
    console.clear()
  }
  useEffect(() => {}, []);
  return (
    <TrackContext.Provider value={tracks.current}>
      <OpenScreen $fullscreen={openFullScreen}>
        <button onClick={() => fullScreen()}>Play</button>
      </OpenScreen>
      {openFullScreen && <Game FX_SOUND1={FX_SOUND1} BgMusic={BgMusic} />}
    </TrackContext.Provider>
  );
}

export default App;
