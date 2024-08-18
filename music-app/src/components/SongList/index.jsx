import { Box, List } from "@mui/material";
import { useContext, useState } from "react";
import SimpleHeader from "./components/Header";
import { GlobalContext } from "../../context/globalContext";
import { SearchInput } from "./components/SearchInput";
import { SongItem } from "../SongItem";

export const SongList = () => {
  const options = ["For You", "Top Tracks"];
  // const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState("");
  const {
    forYouSongs,
    isMobile,
    topTracks,
    currPlaylist,
    setCurrentPlaylist,
    selected,
    setSelected,
  } = useContext(GlobalContext);

  const handleOptionClick = (option) => {
    if (option === options[1]) setCurrentPlaylist(topTracks);
    if (option === options[0]) setCurrentPlaylist(forYouSongs);
    setSelected(option);
  };

  const filterFunction = (song) => {
    return (
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Box sx={{ transition: "all 3s ease", background: "transparent" }}>
      <div>
        <SimpleHeader
          selected={selected}
          handleOptionClick={handleOptionClick}
          options={options}
        />
        <SearchInput query={query} setQuery={setQuery} />

        <Box>
          {currPlaylist.filter(filterFunction).map((song) => (
            <SongItem key={song.id} song={song} />
          ))}
        </Box>
      </div>
    </Box>
  );
};
