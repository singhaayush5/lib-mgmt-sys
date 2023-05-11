import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Modal,
  Box,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import success from "../../images/success.png";
import failure from "../../images/failure.png";
import hourglass from "../../images/hourglass.png";
import axios from "axios";
import { useEffect } from "react";

function IssueCard() {
  const ID = useSelector((state) => state.user._id);
  const rollno = useSelector((state) => state.user.rollno);
  const [popupMsg1, setPopupMsg1] = useState(false);
  const [popupMsg2, setPopupMsg2] = useState(false);
  const [isPending, setPending] = useState(true);
  const [cardAlreadyRequested, setCardAlreadyRequested] = useState(false);

  console.log(cardAlreadyRequested);

  const navigator = useNavigate();

  useEffect(() => {
    getUData();
    checkApproved();
  }, []);

  console.log(isPending);

  const [request, setRequest] = useState({
    reason: "",
  });

  const goHome = (eve) => {
    eve.preventDefault();
    navigator("/");
  };

  const handleChange = (eve) => {
    console.log(request);
    setRequest({ ...request, [eve.target.name]: eve.target.value });
  };

  const revokeRequest = (eve) => {
    eve.preventDefault();

    const revReq = () => {
      axios
        .get(`/api/revokeCardRequestState/${ID}`)
        .then((res) => {
          console.log(res);
          setCardAlreadyRequested(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    revReq();

    navigator("/");
  };

  const postRequest = async (eve) => {
    eve.preventDefault();

    const res = await fetch("http://localhost:8080/api/issuecardreq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: ID,
        rollno: rollno,
        reason: request.reason,
      }),
    });

    const resData = await res.json();
    console.log(res.status);
    if (!res || res.status === 400 || resData.error) {
      console.log("Failure!");
      console.log(resData);
      setPopupMsg2(true);
    } else {
      console.log(resData);
      console.log("Success!");
      setPopupMsg1(true);
    }
  };

  const getUData = () => {
    axios
      .get(`/api/user/${ID}`)
      .then((res) => {
        setCardAlreadyRequested(res.data.cardRequested);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkApproved = () => {
    axios
      .get(`/api/checkcardapproval/${ID}`)
      .then((res) => {
        if (res.status === 200) {
          setPending(false);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return cardAlreadyRequested ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "10% auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isPending ? (
              <img style={{ width: "8%" }} src={hourglass} alt=""></img>
            ) : (
              <img style={{ width: "10%" }} src={success} alt=""></img>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: 600 }} variant="h5">
              Status :&nbsp;
              {isPending ? (
                <span style={{ color: "orange" }}>Pending</span>
              ) : (
                <span style={{ color: "green" }}>Approved</span>
              )}
            </Typography>
          </div>
        </Grid>

        <Grid xs={12} item>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {isPending ? (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontWeight: 700 }} variant="h4">
                    You've already requested for the card!
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{ fontWeight: 700, color: "#6F7378" }}
                    variant="h6"
                  >
                    Your request is currently pending. Kindly contact the
                    librarian for further queries.
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontWeight: 700 }} variant="h4">
                    Your request was granted!
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{ fontWeight: 700, color: "#6F7378" }}
                    variant="h6"
                  >
                    Your request has been approved by the Librarian. Kindly
                    collect your card from the University library.
                  </Typography>
                </div>
              </>
            )}
          </div>
        </Grid>
        <Grid xs={12} item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1% 6%",
            }}
          >
            <Button
              sx={{
                borderRadius: 6,
                fontWeight: 800,
                width: "20%",
                margin: "auto 0.5%",
              }}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={goHome}
              fullWidth
            >
              Go to HomePage
            </Button>
            {isPending && (
              <Button
                sx={{
                  borderRadius: 6,
                  fontWeight: 800,
                  width: "20%",
                  margin: "auto 0.5%",
                }}
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                onClick={revokeRequest}
                fullWidth
              >
                Revoke Request
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <>
      <div>
        <Typography style={{ margin: "6% auto" }} variant="h3" align="Center">
          Issue Library Card
        </Typography>
        <Card style={{ maxWidth: 400, margin: "3% auto", padding: "20px 6px" }}>
          <CardContent>
            <form>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <FormControl name="reason" fullWidth required>
                    <InputLabel id="select-reason-label">Reason</InputLabel>
                    <Select
                      value={request.reason}
                      name="reason"
                      onChange={handleChange}
                      labelId="select-reason-label"
                      label="reason"
                    >
                      <MenuItem value={"First Issue"}>
                        I want to get my library card to be issued for the first
                        time.
                      </MenuItem>
                      <MenuItem value={"Lost Card"}>
                        I have lost my library card and want to get it
                        re-issued.
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <Button
                    sx={{ borderRadius: 6, fontWeight: 800 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={postRequest}
                    fullWidth
                  >
                    Request
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>

      <Modal
        keepMounted
        open={popupMsg1}
        onClose={() => {
          setPopupMsg1(false);
          navigator("/");
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10% auto",
          }}
        >
          <Card
            sx={{
              backgroundColor: "white",
              width: 450,
              padding: "2%",
              borderRadius: 3,
              margin: "1%",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img style={{ width: "30%" }} src={success} alt=""></img>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h4">
                    Request successfully sent!
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "5%",
                  }}
                >
                  <Button
                    sx={{ borderRadius: 6, fontWeight: 800, width: "50%" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={goHome}
                    fullWidth
                  >
                    Go to HomePage
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={popupMsg2}
        onClose={() => {
          setPopupMsg2(false);
          navigator("/");
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10% auto",
          }}
        >
          <Card
            sx={{
              backgroundColor: "white",
              width: 450,
              padding: "2%",
              borderRadius: 3,
              margin: "1%",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img style={{ width: "30%" }} src={failure} alt=""></img>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h4">
                    Couldn't complete request!
                  </Typography>
                </div>
              </Grid>
              <Grid xs={12} item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "5%",
                  }}
                >
                  <Button
                    sx={{ borderRadius: 6, fontWeight: 800, width: "50%" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={goHome}
                    fullWidth
                  >
                    Go to HomePage
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Modal>
    </>
  );
}

export default IssueCard;
