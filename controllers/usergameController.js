const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db
      .UserGame
      .findAll({})
      .then(function(result){
        res.json(result)
        })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  associate: function (req, res) {
    // associates a user and game by sending GameId and UserId key-value pairs in req.body
    db
      .UserGame
      .create(req.body)
      .then(function(result){
         res.json(result)
         })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }
}