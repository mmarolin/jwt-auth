const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const jwt = require("jsonwebtoken");

const app = express();

let PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Halo");
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}... `);
});
