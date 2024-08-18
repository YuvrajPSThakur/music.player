import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = ({ query, setQuery }) => {
  return (
    <Paper
      component='form'
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "98%",
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        color: "white",
        marginTop: 2,
        marginBottom: 4,
        height: 32,
      }}>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          "& .MuiInputBase-input": {
            color: "white",
          },
        }}
        placeholder='Search Song, Artist'
        inputProps={{ "aria-label": "search song", color: "white" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton
        type='button'
        sx={{ p: "10px", color: "#d3d3d3" }}
        aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
