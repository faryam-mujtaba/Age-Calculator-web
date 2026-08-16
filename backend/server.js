const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Calculation = require("./models/Calculation");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Age Calculator API is running!",
  });
});

// Save calculation
app.post("/api/calculations", async (req, res) => {
  try {
    const { birthDate } = req.body;

    if (!birthDate) {
      return res.status(400).json({
        message: "Birth date is required",
      });
    }

    const calculation = await Calculation.create({
      birthDate,
    });

    res.status(201).json({
      message: "Calculation saved successfully",
      calculation,
    });
  } catch (error) {
    console.error("Error saving calculation:", error);

    res.status(500).json({
      message: "Failed to save calculation",
    });
  }
});

module.exports = app;