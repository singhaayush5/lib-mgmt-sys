import {
  CircularProgress,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  ButtonGroup,
} from "@mui/material";

import { useState } from "react";
import dummybook from "../images/dummybook.png";

function Book({ abook }) {
  console.log(abook);
  return (
    <>
      <Card
        sx={{
          margin: "2% 7%",
          padding: "2% 0.5%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#D1CECD",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            margin: " auto 0% auto 1%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "20%", margin: "auto 5% auto 5%" }}
            src={dummybook}
          ></img>
          <Box
            sx={{
              width: "100%",
              margin: " auto 2% auto 1%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                margin: "auto auto auto 1%",
                fontWeight: "700",
                fontSize: "5vh",
              }}
              variant="h5"
            >
              {abook.title} &nbsp;
            </Typography>
            <Typography
              sx={{
                margin: "auto auto auto 1%",
                fontWeight: "700",
                fontSize: 11,
              }}
              variant="h5"
            >
              {abook.author}
            </Typography>
            <Typography
              sx={{
                margin: "auto auto auto 1%",
                fontWeight: "700",
                fontSize: 11,
                color: "#FF7B4F",
              }}
              variant="h5"
            >
              {abook.publisher}
            </Typography>
            {/* <Card
              sx={{
                margin: "3% 0%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF7B47",
              }}
            >
              <Grid container alignItems="center" justify="center">
                <Typography
                  sx={{
                    margin: "1% 1%",
                    fontWeight: "700",
                    fontSize: 9,
                    color: "#ffffff",
                    textTransform: "uppercase",
                  }}
                  variant="h5"
                >
                  {abook.category}
                </Typography>
              </Grid>
            </Card> */}
          </Box>
        </Box>
        <Box sx={{display: "flex", flexDirection:"column", margin:"-1% 1% auto auto", width: "auto"}}>
        <Card
              sx={{
                margin: "3% 0%",
                padding: "2%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FF7B47",
              }}
            >
              
                <Typography
                  sx={{
                    marginRight:"5%",
                    marginLeft:"5%",
                    fontWeight: "700",
                    fontSize: 9,
                    color: "#ffffff",
                    textTransform: "uppercase",
                  }}
                  variant="h5"
                >
                  {abook.category}
                </Typography>
              
            </Card>
        </Box>
      </Card>
    </>
  );
}

export default Book;
