import * as React from "react";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { GlobalContext } from "../../../context/globalContext";

function SimpleHeader({ options, handleOptionClick, selected }) {
  const { isMobile, setOpen, playingSong } = useContext(GlobalContext);
  return (
    <Typography fontSize={18} color='#fdfdfd7d' component='div'>
      {isMobile && playingSong && (
        <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
          <ArrowBackIosIcon />
        </IconButton>
      )}
      {options.map((option, index) => (
        <span
          key={index}
          style={{ marginRight: "18px", cursor: "pointer" }}
          onClick={() => handleOptionClick(option)}>
          {option === selected ? (
            <Typography
              fontSize={18}
              color='white'
              component='span'
              fontWeight='bold'>
              {option}
            </Typography>
          ) : (
            option
          )}
        </span>
      ))}
    </Typography>
  );
}

export default SimpleHeader;
