const express = require("express");
const Player = require("../models/player");
const Match = require("../models/match");
const router = express.Router();

// Get all players
router.get("/players/", async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all matches
router.get("/matches/", async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a player
router.post("/players/", async (req, res) => {
  const player = new Player({
    id: req.body.id,
    name: req.body.name,
    wins: req.body.wins,
    losses: req.body.losses,
    mmr: req.body.mmr,
    skill: req.body.skill,
  });
  try {
    const newPlayer = await player.save();
    res.status(201).json({ message: "Created new player", newPlayer });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Getting One player
router.get("/players/:id", getPlayer, (req, res) => {
  res.json(res.player);
});

// Getting One match
router.get("/matches/:id", getMatch, (req, res) => {
  res.json(res.match);
});

// Updating One
router.patch("/players/:id", getPlayer, async (req, res) => {
  res.player.id = req.body.id ?? res.player.id;
  res.player.name = req.body.name ?? res.player.name;
  res.player.wins = req.body.wins ?? res.player.wins;
  res.player.losses = req.body.losses ?? res.player.losses;
  res.player.mmr = req.body.mmr ?? res.player.mmr;
  res.player.skill = req.body.skill ?? res.player.skill;
  try {
    const updatedPlayer = await res.player.save();
    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a player
router.post("/matches/", async (req, res) => {
  let player1, player2;
  try {
    player1 = await Player.findOne({ id: req.body.id1 });
    player2 = await Player.findOne({ id: req.body.id2 });
    if (player1 == null || player2 == null) {
      return res.status(404).json({
        message: `Can not find player with id ${req.body.id1} or ${req.body.id2}`,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  try {
    let winner = determineWinner(player1, player2);
    calculateNewRating(player1, player2, winner);
    updateWinsLosses(player1, player2, winner);
    let matchID;
    await Match.countDocuments({}, function (err, count) {
      console.log("Number of matches:", count);
      matchID = count;
    });
    const match = await new Match({
      id: matchID,
      p1ID: player1.id,
      p2ID: player2.id,
      winnerID: winner,
    });
    const newMatch = await match.save();
    await player1.save();
    await player2.save();
    res.status(201).json({
      message: `Played a game, winner is ${winner}`,
      newMatch,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting One
router.delete("/players/:id", getPlayer, async (req, res) => {
  try {
    await res.player.remove();
    res.json({ message: "Deleted Player" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPlayer(req, res, next) {
  let player;
  try {
    player = await Player.findOne({ id: req.params.id });
    if (player == null) {
      return res
        .status(404)
        .json({ message: `Can not find player with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.player = player;
  next();
}

async function getMatch(req, res, next) {
  let match;
  try {
    match = await Match.findOne({ id: req.params.id });
    if (match == null) {
      return res
        .status(404)
        .json({ message: `Can not find match with id ${req.params.id}` });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.match = match;
  next();
}

function calculateNewRating(playerA, playerB, winner) {
  let aPrev = playerA.mmr;
  let bPrev = playerB.mmr;
  let ratingDiff = Math.max(Math.min(aPrev - bPrev, 400), -400);
  let winnerOneZero = 0;
  if (winner == playerA.id) {
    winnerOneZero = 1;
  }

  let expected = 1 / (1 + Math.pow(10, ratingDiff / 400));

  let k = 35;
  let ratingChange = parseInt(k * (!!winnerOneZero - expected), 10);

  playerA.mmr = aPrev + ratingChange;
  playerB.mmr = bPrev + ratingChange * -1;
}

function updateWinsLosses(playerA, playerB, winner) {
  if (winner == playerA.id) {
    playerA.wins++;
    playerB.losses++;
  } else {
    playerA.losses++;
    playerB.wins++;
  }
}

function determineWinner(playerA, playerB) {
  let winner;
  let chanceA = Math.pow(3, playerA.skill) - 1;
  let chanceB = Math.pow(3, playerB.skill) - 1;
  sum = chanceA + chanceB;

  // Hit the range on a random position
  let result = Math.random() * sum;
  // Check whose zone the hit landed in
  winner = result < chanceA ? playerA.id : playerB.id;
  return winner;
}

module.exports = router;
