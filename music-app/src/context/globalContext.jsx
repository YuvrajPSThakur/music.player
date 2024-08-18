import React, { createContext, useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material/styles";

const GlobalContext = createContext();

const options = ["For You", "Top Tracks"];

const GlobalContextProvider = ({ children }) => {
  const theme = createTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [forYouSongs, setForYouSongs] = useState([]);
  const [error, setError] = useState();
  const [selected, setSelected] = useState(options[0]);
  const [topTracks, setTopTracks] = useState([]);
  const [playingSong, setPlayingSong] = useState();
  const [currPlaylist, setCurrentPlaylist] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchSongsFromAPI = async () => {
    try {
      const res = await fetch("https://cms.samespace.com/items/songs");
      const songs = await res.json();
      const topTracks = songs?.data.filter((item) => item?.top_track);
      setTopTracks(topTracks);
      setForYouSongs(songs?.data);
      setCurrentPlaylist(songs?.data);
    } catch (err) {
      console.log("error", err);
      setError(err);
    }
  };

  useEffect(() => {
    fetchSongsFromAPI();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isMobile,
        forYouSongs,
        error,
        topTracks,
        playingSong,
        setPlayingSong,
        currPlaylist,
        setCurrentPlaylist,
        selected,
        setSelected,
        open,
        setOpen,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
