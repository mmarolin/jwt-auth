const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({ path: "./.env" });
const authRoute = require("./routes/auth/auth");
const authDashboard = require("./routes/auth/authDashboard");
const app = express();

app.use(express.json(), cors());

app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);

module.exports = app;
