const express = require('express');
const router = express.Router();
const usersRoute = require("./users");
const path = require('path');

router.use("/api/users", usersRoute);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

module.exports = router;
