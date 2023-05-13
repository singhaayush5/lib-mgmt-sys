import { Typography, Card, Box, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import blankbook from "../../images/blankbook.png";

function PendingCardRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    axios
      .get("/api/librariandata")
      .then((res) => {
        setRequests(res.data.libraryCardRequest);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectRequest = (eve) => {
    eve.preventDefault();

    setRequests(requests.filter((item) => item.id !== eve.target.name));

    const revReq = () => {
      axios
        .get(`/api/revokecardrequeststate/${eve.target.name}`)
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

    setRequests(requests.filter((item) => item.id !== eve.target.name));

    const accReq = () => {
      axios
        .get(`/api/approvecardrequest/${eve.target.name}`)
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
                  fontSize: "1.2rem",
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
                  margin: "0.4rem 1rem auto 1rem",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
                variant="h6"
              >
                REASON
              </Typography>
              <Typography
                sx={{
                  margin: "0.4rem 1rem auto auto",
                  fontSize: "1.2rem",
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
                        margin: "0.6rem 0rem auto 1rem",
                        fontSize: "1rem",
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
                        margin: "0.6rem auto auto 1rem",
                        fontSize: "1rem",
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                      variant="h5"
                    >
                      {request.reason}
                    </Typography>
                    <Button
                      sx={{ margin: "0.3rem", borderRadius: 3, width: "3rem" }}
                      name={request.id}
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
                      name={request.id}
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

export default PendingCardRequests;
