const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const gamesRoute = require('./games');
const path = require('path');

router.use("/api/users", usersRoute);
router.use("/api/games", gamesRoute);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;
