import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { formatTime } from "../../helper";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
});

export const SongItem = ({ song }) => {
  const { setPlayingSong, playingSong } = useContext(GlobalContext);
  const [duration, setDuration] = useState();
  const audioRef = React.useRef(null);

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
      padding={"4px"}
      marginY={"2px"}
      sx={{
        cursor: "pointer",
        transition: "all 1s ease",
        overflow: "hidden",
        background:
          playingSong?.id === song?.id ? "rgba(0, 0, 0, 0.35)" : "transparent",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
          transform: "scale(1.02)",
        },
      }}>
      <Box
        display={"flex"}
        alignItems='center'
        gap={"8px"}
        sx={{ margin: 0, padding: 0 }}
        onClick={() => setPlayingSong(song)}>
        <ButtonBase sx={{ width: 48, height: 48, borderRadius: "50%" }}>
          <Img
            alt='Song Cover'
            src={`https://cms.samespace.com/assets/${song?.cover}`}
          />
        </ButtonBase>
        <Box>
          <Typography
            gutterBottom
            variant='subtitle1'
            component='div'
            sx={{
              color: "white",
              fontSize: "0.875rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {song.name}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              color: "lightgrey",
              fontSize: "0.75rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {song.artist}
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Grid item xs={1}>
          <Typography
            variant='subtitle1'
            component='div'
            sx={{ color: "white", fontSize: "0.875rem" }}>
            <audio ref={audioRef} src={song?.url} />
            {formatTime(duration)}
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default SongItem;
