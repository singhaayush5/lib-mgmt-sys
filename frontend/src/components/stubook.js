import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Modal, Card } from "@mui/material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import success from "../images/success.png";
import failure from "../images/failure.png";
import { useSelector } from "react-redux";

function StuBook() {
  // const [currdate, setCurrdate] = useState(dayjs());
  const navigate = useNavigate();
  const [book, setBookData] = useState({});
  const [popupMsg1, setPopupMsg1] = useState(false);
  const [popupMsg2, setPopupMsg2] = useState(false);
  const [popupMsg3, setPopupMsg3] = useState(false);
  const state = useSelector((state) => state);
  const ID = state.user ? state.user._id : null;
  const token = useSelector((state) => state.token);
  const rollno = state.user ? state.user.rollno : null;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;

  useEffect(() => {
    const bookID = window.location.pathname.split("/").pop();
    fetch("http://localhost:3001/api/book/" + bookID)
      .then((data) => {
        return data.json();
      })
      .then((book) => {
        setBookData(book);
      });
  });

  const postRequest = async (eve) => {
    eve.preventDefault();

    if (!ID) {
      setPopupMsg3(true);
    } else {
      const res = await fetch("http://localhost:3001/api/borrowbook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: ID,
          bid: window.location.pathname.split("/").pop(),
          dor: formattedToday,
          rollno: rollno,
        }),
      });

      const resData = await res.json();

      console.log(resData);
      if (!res) {
        setPopupMsg3(true);
        console.log("Failure!");
        console.log(resData);
        //   setPopupMsg2(true);
      } else if (res.status === 200) {
        setPopupMsg1(true);
        console.log(resData);
        console.log("Success!");
        //   setPopupMsg1(true);
      } else if (res.status === 201) {
        setPopupMsg2(true);
        console.log(resData);
        console.log("Success!");
        //   setPopupMsg1(true);
      } else {
        console.log(res.status);
        setPopupMsg3(true);
        console.log(resData);
        console.log("Success!");
        //   setPopupMsg1(true);
      }
    }
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 50 }}>
        <Grid xs={12} md={12} style={{ textAlign: "center" }}>
          <Box
            style={{ maxWidth: "100%" }}
            width={300}
            component="img"
            alt="The house from the offer."
            src="https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image.png"
          />
        </Grid>
        <Grid xs={12} md={12} style={{ textAlign: "center" }}>
          <Typography m={2} variant="h4" fontWeight={"bold"}>
            {book.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" m={2}>
            By - {book.author}
          </Typography>

          <Typography variant="h5" color="text.secondary" m={2}>
            Published by - {book.publisher}
          </Typography>
        </Grid>
        <Grid xs={12} style={{ textAlign: "center" }} item>
          <Button
            sx={{ borderRadius: 6 }}
            type="submit"
            variant="contained"
            onClick={postRequest}
            color="primary"
            disabled={book.quantity ? 0 : 1}
          >
            <Typography
              variant="body1"
              fontWeight={"bold"}
              color={[book.quantity ? "white" : "error"]}
            >
              {book.quantity ? "Issue Book" : "Not Available"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Modal
        keepMounted
        open={popupMsg1}
        onClose={() => {
          setPopupMsg1(false);
          navigate(0);
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
                    onClick={(eve) => {
                      navigate(0);
                    }}
                    fullWidth
                  >
                    Refresh Page
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
          navigate(0);
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
                    You've already requested!
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
                    onClick={(eve) => {
                      navigate(0);
                    }}
                    fullWidth
                  >
                    Refresh Page
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Modal>
      <Modal
        keepMounted
        open={popupMsg3}
        onClose={() => {
          setPopupMsg3(false);
          navigate(0);
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
                  <Typography variant="h4">Error Occured!</Typography>
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
                    onClick={(eve) => {
                      navigate(0);
                    }}
                    fullWidth
                  >
                    Refresh Page
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

export default StuBook;
