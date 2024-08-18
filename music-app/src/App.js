import "./App.css";
import Grid from "@mui/material/Grid";
import { MusicAppBanner } from "./components/MusicAppBanner";
import { SongList } from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { useContext } from "react";
import { GlobalContext } from "./context/globalContext";

function App() {
  const { isMobile, playingSong } = useContext(GlobalContext);

  return (
    <Grid
      container
      width={"100%"}
      margin={0}
      padding={0}
      minHeight={"100vh"}
      spacing={isMobile ? 0 : 1}>
      {!isMobile && (
        <Grid item md={2} xs={12}>
          <MusicAppBanner />
        </Grid>
      )}

      {!isMobile && (
        <Grid
          sx={{ transition: "all 0.1s ease" }}
          item
          md={playingSong ? 4 : 8}
          marginTop={4}
          padding={4}
          xs={0}>
          <SongList />
        </Grid>
      )}

      <Grid
        item
        md={6}
        xs={12}
        padding={0}
        margin={0}
        sx={{
          opacity: playingSong || isMobile ? 1 : 0,
          visibility: playingSong || isMobile ? "visible" : "hidden",
          transition: "opacity 1s ease, visibility 1s ease",
        }}
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}>
        {playingSong || isMobile ? <SongPlayer /> : <></>}
      </Grid>
    </Grid>
  );
}

export default App;
