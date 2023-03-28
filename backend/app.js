const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3005;
const dbConnection = require("./database/connection/connection");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbConnection();

app.use("/", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`App active on port ${PORT}!`);
});
