import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import * as React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [dob, setDate] = React.useState(dayjs());

  const [user, setUser] = useState({
    name: "",
    branch: "",
    email: "",
    rollno: "",
    password: "",
  });
  const navigator = useNavigate();

  const handleChange = (eve) => {
    console.log(user);
    setUser({ ...user, [eve.target.name]: eve.target.value });
  };

  const postUserData = async (eve) => {
    eve.preventDefault();

    const { name, branch, email, rollno, password } = user;
    const finalDob = await dob.format("YYYY-MM-DD");
    console.log(finalDob);

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        dob: finalDob,
        branch: branch,
        email: email,
        rollno: rollno,
        password: password,
      }),
    });

    const resData = await res.json();
    if (resData.status === 500 || !resData || resData.error) {
      console.log("Failure!");
    } else {
      console.log("Success!");
    }

    navigator("/student/login");
  };

  return (
    <div>
      <Typography style={{ margin: "5% auto" }} variant="h3" align="Center">
        Register
      </Typography>
      <Card style={{ maxWidth: 400, margin: "5% auto", padding: "25px 6px" }}>
        <CardContent>
          <form>
            <Grid container spacing={2}>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={6} sm={6} item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    name="dob"
                    value={dob}
                    onChange={(newdate) => setDate(newdate)}
                    renderInput={(props) => <TextField {...props} />}
                    slotProps={{
                      textField: {
                        helperText: "MM / DD / YYYY",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={6} sm={6} item>
                <FormControl name="branch" fullWidth required>
                  <InputLabel id="select-branch-label">Branch</InputLabel>
                  <Select
                    value={user.branch}
                    name="branch"
                    onChange={handleChange}
                    labelId="select-branch-label"
                    label="branch"
                  >
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"ECE"}>ECE</MenuItem>
                    <MenuItem value={"EEE"}>EEE</MenuItem>
                    <MenuItem value={"MECH"}>MECH</MenuItem>
                    <MenuItem value={"CHEM"}>CHEM</MenuItem>
                    <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                    <MenuItem value={"PROD"}>PROD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} item>
                <TextField
                  size="small"
                  name="phno"
                  value={user.phno}
                  onChange={handleChange}
                  label="Phone No."
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  name="rollno"
                  value={user.rollno}
                  onChange={handleChange}
                  label="Roll number"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  name="email"
                  value={user.email}
                  type="email"
                  onChange={handleChange}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
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

export default Signup;
