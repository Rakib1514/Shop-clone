const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Ritox DB is connected");
});

app.listen(PORT, () => {
  console.log(`PORT RUNNING ON ${PORT}`);
});
