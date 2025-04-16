const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", async (req, res) => {
  res.send("Ritox DB is connected");
});

app.listen(PORT, () => {
  console.log(`PORT RUNNING ON ${PORT}`);
});
