import { Button, Box, Typography, Grid } from "@mui/material";
import React from "react";
import library from "../../videos/library.mp4";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="hero">
        <video playsInline autoPlay muted loop className="banner-video">
          <source src={library} type="video/mp4"></source>
        </video>
        <div className="heading">
          <Typography variant="h1">Library</Typography>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
            backgroundColor: "#ffffff",
            width: "100%",
          }}
          className="options"
        >
          <Grid container>
            <Grid xs={12} sm={6} item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{margin:"2% auto"}} variant="h4">You can do these things.</Typography>
              </div>
            </Grid>
            <Grid xs={12} sm={6} item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    margin: "1% auto",
                    borderRadius: 5,
                    width: "20rem",
                    fontWeight: 800,
                  }}
                  variant="contained"
                >
                  FIND BOOKS
                </Button>

                <Button
                  sx={{
                    margin: "1% auto",
                    borderRadius: 5,
                    width: "20rem",
                    fontWeight: 800,
                  }}
                  variant="contained"
                >
                  LIBRARY CARD
                </Button>

                <Button
                  sx={{
                    margin: "1% auto",
                    borderRadius: 5,
                    width: "20rem",
                    fontWeight: 800,
                  }}
                  variant="contained"
                >
                  TRACK REQUESTS
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Home;
