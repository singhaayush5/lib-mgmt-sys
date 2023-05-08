import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StuLogin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigator = useNavigate();

  const handleChange = (eve) => {
    console.log(user);
    setUser({ ...user, [eve.target.name]: eve.target.value });
    console.log(user.branch);
  };

  const postUserData = async (eve) => {
    eve.preventDefault();
    const { email, password } = user;
    console.log(user);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const resData = await res.json();
    if (resData.status === 400 || !resData || resData.error) {
      console.log("Failure!");
      console.log(resData);
      navigator("/student/login");
    } else {
      console.log(resData);
      console.log("Success!");
      navigator("/student");
    }
  };

  return (
    <div>
      <Typography style={{ margin: "6% auto" }} variant="h3" align="Center">
        Login
      </Typography>
      <Card style={{ maxWidth: 400, margin: "3% auto", padding: "20px 6px" }}>
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <Button
                  sx={{ borderRadius: 6 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={postUserData}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default StuLogin;
