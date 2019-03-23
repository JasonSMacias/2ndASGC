const db = require('../models');

module.exports = {
  findAll: function(req, res) {
    db
      .Game
      .findAll({})
      .then(dbGames => res.json(dbGames))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  addGame: function (req, res) {
    db
      .Game.create({
      
        name: req.body.name
      })
      .then(function(result) {
        res.json(result);
      });
  },

  findById: function(req, res){
     db
      .Game
      .findOne({
      
        where: {
          id: req.params.id
        },
        
      })
      .then(dbGames => res.json(dbGames))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  updateById: function(req, res){
  
    db
      .Game
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(dbGames => res.json(dbGames))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}