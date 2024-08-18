import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Drawer, IconButton, Slider } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import { formatTime } from "../../helper";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { SongList } from "../SongList";
import MenuIcon from "@mui/icons-material/Menu";

function SongPlayer() {
  const { playingSong, currPlaylist, setPlayingSong, isMobile, open, setOpen } =
    useContext(GlobalContext);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const toggleDrawer = () => setOpen((state) => !state);

  const handleNextPrev = (action) => {
    const currentSongIndex = currPlaylist.findIndex(
      (item) => item.id === playingSong.id
    );

    if (action === "prev") {
      if (currentSongIndex === 0) {
        setPlayingSong(currPlaylist[currPlaylist.length - 1]);
      } else {
        setPlayingSong(currPlaylist[currentSongIndex - 1]);
      }
    }

    if (action === "next") {
      if (currentSongIndex === currPlaylist.length - 1) {
        setPlayingSong(currPlaylist[0]);
      } else {
        setPlayingSong(currPlaylist[currentSongIndex + 1]);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const newMuteState = !prevMuted;
      if (audioRef.current) {
        audioRef.current.muted = newMuteState;
      }
      return newMuteState;
    });
  };

  const handleStop = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleSliderChange = (event, newValue) => {
    const newTime = (newValue / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newValue);
    setCurrentTime(newTime);
  };

  useEffect(() => {
    setPlaying(true);
    audioRef.current.currentTime = 0;
    const accentColor = playingSong?.accent || "#282c34";
    const greyColor = "#808080";

    const gradientBackground = `linear-gradient(135deg, ${accentColor} 0%, ${greyColor} 100%)`;

    document.body.style.background = gradientBackground;

    return () => {
      document.body.style.background = "";
    };
  }, [playingSong]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <Box
      sx={{
        background: "transparent",
        maxWidth: 340,
        alignSelf: isMobile ? "flex-start" : "center",
        opacity: isMobile && open ? 0 : 1,
        paddingTop: 4,
        visibility: isMobile && open ? "hidden" : "visible",
        transition: "opacity .3s ease, visibility .3s ease",
      }}>
      {isMobile && playingSong && (
        <>
          <IconButton
            sx={{ position: "absolute", right: 0, color: "white" }}
            onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='right'
            open={open}
            onClose={() => toggleDrawer(false)}
            PaperProps={{
              sx: {
                width: "100%",
                backgroundColor: "transparent",
                padding: 2,
                boxSizing: "border-box",
              },
            }}>
            <SongList />
          </Drawer>
        </>
      )}
      <Typography gutterBottom variant='h5' color={"white"}>
        {playingSong?.name}
      </Typography>
      <Typography variant='body2' color={"#fdfdfd7d"}>
        {playingSong?.artist}
      </Typography>
      {!playingSong && (
        <Box width={340}>
          <SongList />
        </Box>
      )}

      {playingSong && (
        <Box
          height={340}
          width={340}
          marginTop={2}
          sx={{
            backgroundImage:
              `url(https://cms.samespace.com/assets/${playingSong?.cover})` ||
              "",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 2,
            transition: "all 1s ease",
          }}
        />
      )}

      <audio
        ref={audioRef}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        src={playingSong?.url}
        onEnded={() => setPlaying(false)}
      />

      {playingSong && (
        <>
          <Slider
            value={progress}
            onChange={handleSliderChange}
            color='info'
            sx={{
              width: "340px",
              color: "white",
              "& .MuiSlider-thumb": {
                transition: "background-color 0.3s, border-color 0.3s",
                display: "none",
              },
              "&:hover .MuiSlider-thumb": {
                display: "block",
                backgroundColor: "white",
                borderColor: "white",
              },
              "& .MuiSlider-track": {
                backgroundColor: "white",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
            aria-labelledby='audio-progress'
          />

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}>
            <Typography fontSize={8} color='whitesmoke'>
              {formatTime(currentTime)}
            </Typography>
            <Typography fontSize={8} color='whitesmoke'>
              {formatTime(duration)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2px",
              alignItems: "center",
            }}>
            <IconButton
              sx={{
                color: "white",
                fontSize: 48,
              }}>
              <MoreHorizIcon />
            </IconButton>
            <IconButton
              onClick={() => handleNextPrev("prev")}
              sx={{
                color: "white",
                fontSize: 48,
              }}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              onClick={handleStop}
              sx={{
                color: "white",
                fontSize: 48,
              }}>
              {playing ? (
                <PauseCircleFilledIcon fontSize='inherit' />
              ) : (
                <PlayCircleFilledWhiteIcon fontSize='inherit' />
              )}
            </IconButton>
            <IconButton
              onClick={() => handleNextPrev("next")}
              sx={{
                color: "white",
                fontSize: 48,
              }}>
              <SkipNextIcon />
            </IconButton>

            <IconButton
              onClick={toggleMute}
              sx={{
                color: "white",
                fontSize: 22,
                padding: 0,
                height: "fit-content",
              }}>
              {isMuted ? (
                <VolumeOffIcon fontSize='inherit' />
              ) : (
                <VolumeUpIcon fontSize='inherit' />
              )}
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}

export default SongPlayer;
