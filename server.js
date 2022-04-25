const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth/auth");
const authDashboard = require("./routes/auth/authDashboard");
const app = express();
let PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Halo");
});

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

app.use(express.json(), cors());

app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}... `);
});
