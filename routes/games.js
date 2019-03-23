var db = require('../models');
var express = require('express');
var router = express.Router();
const userController = require('../controllers/gameController');

router
  .route('/')
  .get(userController.findAll)
  .post(userController.addGame);

router
  .route('/id/:id')
  .get(userController.findById)
  .put(userController.updateById);

  module.exports = router;