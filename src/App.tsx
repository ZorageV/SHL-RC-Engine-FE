import React from "react";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import SearchInterface from "./SearchInterface";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SHL Assessment Search
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <SearchInterface />
      </Container>
    </>
  );
}

export default App;
