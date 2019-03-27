var db = require('../models');
var express = require('express');
var router = express.Router();
const distanceController = require('../controllers/distanceController');

router
  .route('/:id')
  .get(distanceController.findNear);

  module.exports = router;