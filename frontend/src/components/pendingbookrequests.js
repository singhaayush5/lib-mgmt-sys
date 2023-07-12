import { Typography, Card, Box, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import blankbook from "../images/blankbook.png";

function PendingBookRequests() {
    const ID = useSelector((state) => state.user._id);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios
      .get("http://localhost:3001/api/librariandata")
      .then((res) => {
        setRequests(res.data.borrowRequests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectRequest = (eve) => {
    eve.preventDefault();

    setRequests(requests.filter((item) => (item.id !== eve.target.value  &&  item.bid !== eve.target.name)));
    const revReq = () => {
      axios
        .get(`http://localhost:3001/api/rejectbook/${eve.target.value}/${eve.target.name}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    revReq();
  };

  const acceptRequest = (eve) => {
    eve.preventDefault();

    setRequests(requests.filter((item) => (item.id !== eve.target.value  &&  item.bid !== eve.target.name)));

    const accReq = () => {
      axios
        .get(`http://localhost:3001/api/approvebookrequest/${eve.target.value}/${eve.target.name}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    accReq();
  };

  console.log(requests);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {requests.length > 0 ? (
          <Card
            sx={{
              width: "90%",
              padding: 0,
              margin: "2% auto auto auto",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                height: "3rem",
                width: "100%",
                margin: "0%",
                backgroundColor: "#a2d2ff",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  margin: "0.4rem 0rem auto 1rem",
                  fontSize: "1.5vw",
                  fontWeight: 800,
                  letterSpacing: 1,
                  width: "25%",
                }}
                variant="h6"
              >
                ROLL NO.
              </Typography>
              <Typography
                sx={{
                  margin: "0.4rem 0rem auto 1rem",
                  fontSize: "1.5vw",
                  fontWeight: 800,
                  letterSpacing: 1,
                  width: "25%",
                }}
                variant="h6"
              >
                BOOK ID
              </Typography>
              <Typography
                sx={{
                  margin: "0.4rem 1rem auto 10rem",
                  fontSize: "1.5vw",
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
                variant="h6"
              >
                DATE
              </Typography>
              <Typography
                sx={{
                  margin: "0.4rem 1rem auto auto",
                  fontSize: "1.5vw",
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
                variant="h6"
              >
                APPROVE/REJECT
              </Typography>
              <Divider />
            </Box>

            {requests.map((request) => {
              return (
                <>
                  <Box sx={{ display: "flex", height: "2.5rem" }}>
                    <Typography
                      sx={{
                        margin: "0.4rem 0rem auto 1rem",
                        fontSize: "1.4vw",
                        fontWeight: 700,
                        letterSpacing: 1,
                        width: "25%",
                      }}
                      variant="h5"
                    >
                      {request.rollno}
                    </Typography>
                    <Typography
                      sx={{
                        margin: "0.4rem auto auto 1rem",
                        fontSize: "1.4vw",
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                      variant="h5"
                    >
                      {request.id}
                    </Typography>
                    <Typography
                      sx={{
                        margin: "0.4rem auto auto 1rem",
                        fontSize: "1.4vw",
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                      variant="h5"
                    >
                      {request.dor}
                    </Typography>
                    <Button
                      sx={{ margin: "0.3rem", borderRadius: 3, width: "3rem" }}
                      name={request.bid}
                      value={request.id}
                      onClick={acceptRequest}
                      color="success"
                      size="small"
                      variant="contained"
                    >
                      ✓
                    </Button>
                    <Button
                      sx={{
                        margin: "0.3rem 2.5rem 0.3rem 0rem",
                        borderRadius: 3,
                        width: "3rem",
                      }}
                      name={request.bid}
                      value={request.id}
                      onClick={rejectRequest}
                      color="error"
                      size="small"
                      variant="contained"
                    >
                      ✗
                    </Button>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Card>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "12% auto auto auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img style={{ width: "10rem" }} src={blankbook} alt=""></img>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "7% auto auto auto",
              }}
            >
              <Typography sx={{ fontWeight: 700 }} variant="h4">
                No requests currently.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "2% auto auto auto",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, color: "#6F7378" }}
                variant="h5"
              >
                Any further requests will be listed here.
              </Typography>
            </Box>
          </Box>
        )}
      </div>
    </>
  );
}

export default PendingBookRequests;
