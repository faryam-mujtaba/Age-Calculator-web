const mongoose = require("mongoose");

const calculationSchema = new mongoose.Schema(
  {
    birthDate: {
      type: Date,
      required: true,
    },
    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Calculation", calculationSchema);