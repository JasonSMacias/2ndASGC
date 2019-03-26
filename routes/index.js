const express = require('express');
const router = express.Router();
const usersRoute = require('./users');
const gamesRoute = require('./games');
const usergameRoute = require('./usergame.js');
// const distanceRout = require('./distance.js');
const path = require('path');

router.use("/api/users", usersRoute);
router.use("/api/games", gamesRoute);
router.use("/api/usergame", usergameRoute);
// router.use("/api/distance", distanceRoute);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"))
});

module.exports = router;
