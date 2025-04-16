const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/users", userRoutes);

// Error Middleware after the routes
app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.send("Ritox DB is connected");
});

app.listen(PORT, () => {
  console.log(`PORT RUNNING ON ${PORT}`);
});
