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
  },

  findByGameId: function (req, res){
    //pull up users associated with a specific game
    db
      .UserGame
      .findAll({
      
        where: {
          Gameid: req.params.id
        },
        
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  findByUserId: function (req, res) {
    //pull up games associated with a specific user
    db
      .UserGame
      .findAll({
      
        where: {
          Userid: req.params.id
        },
        
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }
}