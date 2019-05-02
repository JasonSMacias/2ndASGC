var db = require('../models');
var express = require('express');
var router = express.Router();
const gameController = require('../controllers/gameController');

router
  .route('/')
  .get(gameController.findAll)
  .post(gameController.addGame);

router
  .route('/id/:id')
  .get(gameController.findById)
  .put(gameController.updateById);

  module.exports = router;