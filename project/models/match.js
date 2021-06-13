const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  p1ID: {
    type: Number,
    required: true,
  },
  p2ID: {
    type: Number,
    required: true,
  },
  winnerID: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Match", matchSchema);
