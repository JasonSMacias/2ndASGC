var db = require('../models');
var express = require('express');
var router  = express.Router();
const usergameController = require('../controllers/usergameController');

router
  .route('/')
  .get(usergameController.findAll)
  .post(usergameController.associate);

module.exports = router;