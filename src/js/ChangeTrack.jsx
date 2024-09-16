import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import styled from "styled-components";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { TrackContext } from "../App";

const MainContainer = styled.div`
  inset: 0;
  background-color: var(--game-purple);
  display: flex;
  z-index: 9;
  position: fixed;
  justify-content: center;
  align-items: center;
  font-family: "Gasalt-Black";
  font-size: 2rem;
  color: #fff;

  ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .sound button {
    background-color: #434040;
    padding: 0.8rem;
    border-radius: 8px;
    display: grid;
    place-content: center;
    color: #e60fb0;
    position: relative;
    z-index: 2;
  }

  .sound button {
    font-size: inherit;
    font-family: inherit;
  }
`;

const BackButton = styled.button`
  position: fixed;
  left: 5vw;
  top: 2vh;
  color: #b611c2;
  font-size: 3rem;
`;

const Title = styled.span`
  transition: all 400ms;
  transform: ${(props) =>
    props.$trackVel.play && `translateX(${props.$trackVel.offset}px)`};
`;

const List = styled.li`
  background-color: #000;
  border: 4px solid #59076d;
  border-radius: 12px;
  margin-block: 0.8rem;
  display: flex;
  gap: 2rem;
  padding: 10px;
  width: 80vw;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  overflow: hidden;
`;

function ChangeTrack({ setOpenChangeTrack, FX_SOUND1, BgMusic }) {
  
  const [track1_playing, setTrack1Playing] = useState(
    BgMusic.current.sound.playing() &&
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Get Over Me"
      ? true
      : false
  );
  const [track2_playing, setTrack2Playing] = useState(
    BgMusic.current.sound.playing() &&
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Pacifier"
      ? true
      : false
  );
  const [track3_playing, setTrack3Playing] = useState(
    BgMusic.current.sound.playing() &&
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Renegrade"
      ? true
      : false
  );
  const [track4_playing, setTrack4Playing] = useState(
    BgMusic.current.sound.playing() &&
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "The Scepter"
      ? true
      : false
  );
  const [track5_playing, setTrack5Playing] = useState(
    BgMusic.current.sound.playing() &&
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Let's Roll"
      ? true
      : false
  );
  const tracks = useContext(TrackContext);
  const [trackVel, setTrackVel] = useState({
    track1: {
      play:
        JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Get Over Me"
          ? true
          : false,
      offset: 0,
    },
    track2: {
      play:
        JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Pacifier"
          ? true
          : false,
      offset: 0,
    },
    track3: {
      play:
        JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Renegrade"
          ? true
          : false,
      offset: 0,
    },
    track4: {
      play:
        JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "The Scepter"
          ? true
          : false,
      offset: 0,
    },
    track5: {
      play:
        JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName ===
        "Let's Roll"
          ? true
          : false,
      offset: 0,
    },
  });

  function setTrackName(trackType) {
    BgMusic.current.sound.stop();
    BgMusic.current = trackType.current;
    BgMusic.current.sound.play("bgmusic");
    let soundSettingsData = JSON.parse(
      localStorage.getItem("soundSettingsData")
    );
    soundSettingsData = {
      ...soundSettingsData,
      music: true,
      BgTrackName: trackType.current.title,
    };
    localStorage.setItem(
      "soundSettingsData",
      JSON.stringify(soundSettingsData)
    );
  }

  function playTrack1() {
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName !==
      "Get Over Me"
    ) {
      setTrack1Playing(true);
      setTrack2Playing(false);
      setTrack3Playing(false);
      setTrack4Playing(false);
      setTrack5Playing(false);
      setTrackName(tracks[0]);
    }
  }
  function playTrack2() {
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName !==
      "Pacifier"
    ) {
      setTrack1Playing(false);
      setTrack2Playing(true);
      setTrack3Playing(false);
      setTrack4Playing(false);
      setTrack5Playing(false);
      setTrackName(tracks[1]);
    }
  }
  function playTrack3() {
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName !==
      "Renegrade"
    ) {
      setTrack1Playing(false);
      setTrack2Playing(false);
      setTrack3Playing(true);
      setTrack4Playing(false);
      setTrack5Playing(false);
      setTrackName(tracks[2]);
    }
  }
  function playTrack4() {
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName !==
      "The Scepter"
    ) {
      setTrack1Playing(false);
      setTrack2Playing(false);
      setTrack3Playing(false);
      setTrack4Playing(true);
      setTrack5Playing(false);
      setTrackName(tracks[3]);
    }
  }
  function playTrack5() {
    if (
      JSON.parse(localStorage.getItem("soundSettingsData")).BgTrackName !==
      `Let's Roll`
    ) {
      setTrack1Playing(false);
      setTrack2Playing(false);
      setTrack3Playing(false);
      setTrack4Playing(false);
      setTrack5Playing(true);
      setTrackName(tracks[4]);
    }
  }

  useEffect(() => {
    setInterval(() => {
      setTrackVel((prev) => ({
        ...prev,
        track3: {
          ...prev.track3,
          offset: prev.track3.offset <= -150 ? 250 : prev.track3.offset - 4,
        },
      }));
    }, 200);
  }, []);
  return (
    <MainContainer>
      <BackButton
        onClick={() => {
          setOpenChangeTrack(false);
          FX_SOUND1.current.play();
        }}
      >
        <RiArrowLeftCircleFill />
      </BackButton>
      <ul>
        <List className="sound">
          <Title $trackVel={trackVel.track1}>{tracks[0].current.title}</Title>
          <button
            onClick={() => {
              playTrack1();
            }}
          >
            {track1_playing ? <BsSoundwave /> : <FaPlayCircle />}
          </button>
        </List>
        <List className="sound">
          <Title $trackVel={trackVel.track2}>{tracks[1].current.title}</Title>
          <button
            onClick={() => {
              playTrack2();
            }}
          >
            {track2_playing ? <BsSoundwave /> : <FaPlayCircle />}
          </button>
        </List>
        <List className="sound">
          <Title $trackVel={trackVel.track3}>{tracks[2].current.title}</Title>
          <button
            onClick={() => {
              playTrack3();
            }}
          >
            {track3_playing ? <BsSoundwave /> : <FaPlayCircle />}
          </button>
        </List>
        <List className="sound">
          <Title $trackVel={trackVel.track4}>{tracks[3].current.title}</Title>
          <button
            onClick={() => {
              playTrack4();
            }}
          >
            {track4_playing ? <BsSoundwave /> : <FaPlayCircle />}
          </button>
        </List>
        <List className="sound">
          <Title $trackVel={trackVel.track5}>{tracks[4].current.title}</Title>
          <button
            onClick={() => {
              playTrack5();
            }}
          >
            {track5_playing ? <BsSoundwave /> : <FaPlayCircle />}
          </button>
        </List>
      </ul>
    </MainContainer>
  );
}

export default ChangeTrack;
