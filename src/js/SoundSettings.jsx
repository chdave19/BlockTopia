import React, { useEffect } from "react";
import styled from "styled-components";
import { Howl, Howler } from "howler";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import { IoVolumeMute } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { useState, useRef } from "react";

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
  .sound div {
    display: flex;
    gap: 2px;
  }

  .sound div button {
    background-color: #434040;
    padding: 0.8rem;
    border-radius: 8px;
    display: grid;
    place-content: center;
  }

  .sound button {
    color: inherit;
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
`;

function SoundSettings({
  BgMusic,
  setOpenSoundSettings,
  FX_SOUND1,
  ScoreFx,
  LandingFx,
}) {
  const fxsound = FX_SOUND1.current;
  const [settingsData, setSettingsData] = useState({
    music: localStorage.getItem("soundSettingsData")
      ? JSON.parse(localStorage.getItem("soundSettingsData")).music
      : BgMusic.current.playing(),
    sfx: localStorage.getItem("soundSettingsData")
      ? JSON.parse(localStorage.getItem("soundSettingsData")).sfx
      : !fxsound.mute(),
    mute: localStorage.getItem("soundSettingsData")
      ? JSON.parse(localStorage.getItem("soundSettingsData")).mute
      : false,
  });
  const settingsDataRef = useRef(settingsData);

  const pauseFx = () => {
    fxsound.play();
    fxsound.mute(true);
    ScoreFx.current.mute(true);
    LandingFx.current.mute(true);
    setSettingsData((prev) => ({ ...prev, sfx: false }));
  };
  const resumeFx = () => {
    fxsound.play();
    fxsound.mute(false);
    ScoreFx.current.mute(false);
    LandingFx.current.mute(false);
    setSettingsData((prev) => ({ ...prev, sfx: true }));
  };

  useEffect(() => {
    settingsDataRef.current = settingsData;
    setTimeout(() => {
      localStorage.setItem(
        "soundSettingsData",
        JSON.stringify(settingsDataRef.current)
      );
    }, 600);
  }, [settingsData]);
  return (
    <MainContainer>
      <BackButton
        onClick={() => {
          fxsound.play();
          setOpenSoundSettings(false);
        }}
      >
        <RiArrowLeftCircleFill />
      </BackButton>
      <ul>
        <List className="sound">
          <span>Music</span>
          <div>
            <button
              style={{
                border: settingsData.music
                  ? "2px solid #2ee712"
                  : "2px solid #ffffff",
              }}
              onClick={() => {
                fxsound.play();
                setSettingsData((prev) => ({ ...prev, music: true }));
                !BgMusic.current.playing() && BgMusic.current.play("bgmusic");
              }}
            >
              On
            </button>
            <button
              style={{
                border: settingsData.music
                  ? "2px solid #ffffff"
                  : "2px solid #2ee712",
              }}
              onClick={() => {
                fxsound.play();
                BgMusic.current.stop();
                setSettingsData((prev) => ({ ...prev, music: false }));
              }}
            >
              Off
            </button>
          </div>
        </List>
        <List className="sound">
          <span>SFX</span>
          <div>
            <button
              style={{
                border: settingsData.sfx
                  ? "2px solid #2ee712"
                  : "2px solid #ffffff",
              }}
              onClick={() => resumeFx()}
            >
              On
            </button>
            <button
              style={{
                border: settingsData.sfx
                  ? "2px solid #ffffff"
                  : "2px solid #2ee712",
              }}
              onClick={() => pauseFx()}
            >
              Off
            </button>
          </div>
        </List>
        <List className="sound">
          <span>Mute</span>
          <div>
            <button
              style={{
                border: settingsData.mute
                  ? "2px solid #2ee712"
                  : "2px solid #ffffff",
              }}
              onClick={() => {
                fxsound.play();
                setSettingsData((prev) => ({ ...prev, mute: true }));
                Howler.mute(true);
              }}
              className="mute"
            >
              <IoVolumeMute />
            </button>
            <button
              style={{
                border: settingsData.mute
                  ? "2px solid #ffffff"
                  : "2px solid #2ee712",
              }}
              onClick={() => {
                fxsound.play();
                setSettingsData((prev) => ({ ...prev, mute: false }));
                Howler.mute(false);
              }}
              className="mute"
            >
              <GoUnmute />
            </button>
          </div>
        </List>
      </ul>
    </MainContainer>
  );
}

export default SoundSettings;
