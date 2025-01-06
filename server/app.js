const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
requre("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error: ", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal serve error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
