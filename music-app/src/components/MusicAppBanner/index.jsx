import { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Box, Menu, MenuItem } from "@mui/material";
import { SpotifyLogo } from "../../icons/spotify";

export const MusicAppBanner = () => {
  const { isMobile } = useContext(GlobalContext);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: isMobile ? "12px" : "24px",
        }}>
        <SpotifyLogo
          width={isMobile ? "110" : "134"}
          height={isMobile ? "30" : "40"}
        />
        <Menu>
          <MenuItem>For you</MenuItem>
        </Menu>
      </Box>
    </div>
  );
};
