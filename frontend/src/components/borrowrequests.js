import { Typography, Box } from "@mui/material";
import { useState } from "react";
import PendingBookRequests from "./pendingbookrequests";
import ApprovedBookRequests from "./approvedbookrequests";

function BorrowRequests() {
  const [showPending, setPending] = useState(true);

  const handleClick = (eve) => {
    eve.preventDefault();
    setPending(!showPending);
    console.log(showPending);
  };

  const style1 = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#E9F8F9",
  };
  const style2 = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  };

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
        <Typography
          sx={{
            margin: "1% auto 2% auto",
            fontSize: "2rem",
            fontWeight: "700",
          }}
          variant="h4"
        >
          Book issue requests
        </Typography>

        <Box sx={{ width: "100%", display: "flex" }}>
          <Box
            onClick={
              !showPending
                ? handleClick
                : (eve) => {
                    console.log(eve);
                  }
            }
            sx={showPending ? style1 : style2}
          >
            {showPending && (
              <div
                style={{
                  width: "50%",
                  backgroundColor: "#205E61",
                  height: "0.2rem",
                  position: "absolute",
                }}
              ></div>
            )}
            <Typography
              sx={{ margin: "2% auto", fontSize: "1.5rem", fontWeight: 600 }}
              variant="h5"
            >
              Pending Requests
            </Typography>
          </Box>
          <Box
            onClick={
              showPending
                ? handleClick
                : (eve) => {
                    console.log(eve);
                  }
            }
            sx={showPending ? style2 : style1}
          >
            {!showPending && (
              <div
                style={{
                  width: "50%",
                  backgroundColor: "#205E61",
                  height: "0.2rem",
                  position: "absolute",
                }}
              ></div>
            )}
            <Typography
              sx={{ margin: "2% auto", fontSize: "1.5rem", fontWeight: 600 }}
              variant="h5"
            >
              Approved Requests
            </Typography>
          </Box>
        </Box>
      </div>
      <Box sx={{ backgroundColor: "#E9F8F9", height: "50rem" }}>
        {showPending ? <PendingBookRequests /> : <ApprovedBookRequests />}
      </Box>
    </>
  );
}

export default BorrowRequests;
