var db = require('../models');
var express = require('express');
var router  = express.Router();
const usergameController = require('../controllers/usergameController');

router
  .route('/')
  .get(usergameController.findAll)
  .post(usergameController.associate);
  // need delete route to delete association, taking BOTH ids as a where and deleting that association

// find users by game id
router
  .route('/game/:id')
  .get(usergameController.findByGameId);

// find games by user id
router
  .route('/user/:id')
  .get(usergameController.findByUserId);

module.exports = router;