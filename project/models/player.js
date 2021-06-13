const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  mmr: {
    type: Number,
    required: true,
  },
  skill: {
    type: Number,
    required: true,
  },
  timeCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Player", playerSchema);
