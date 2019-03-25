var db = require('../models');
var express = require('express');
var router = express.Router();
const distanceController = require('../controllers/distanceController');

router
  .route('/')
  .get(distanceController.findNear);

  module.exports = router;