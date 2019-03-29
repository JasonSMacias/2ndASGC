const db = require('../models');
const usergameController = require('./usergameController');

// const turfDistance = require('@turf/distance');

module.exports = {
  // compare coordinates sent in latitude and longitude in req.body to coordinates of other users in db where a match exists with one of the games in game interest array sent in req.body, return sorted list of nearest users with matching game interests. or maybe just send user id and set up promise chain to get coordinates, games, then get users with matching games, get coordinates for each, use turf distance to set a distance for each, and sort, then return sorted list.
  findNear: function(req, res) {
      let geocode = {};
      let games = [];
      let gameIds;
      
    
    // take userid in req.params and hit user db, pulling out games and geocode data and saving them in variables
    // function getUserData() {

      db
        .User
        .findOne({
          include: [
          {
            model: db.Game,
            through: db.UserGame,
            },
          
        ],
          where: {
            id: req.params.id
          },
          
        })
        .then(dbUser => {
          // console.log(dbUser);
          geocode = dbUser.geocodeLocation;
          games = dbUser.Games;
          console.log("Geocode: "+geocode);
          console.log("Games[0].dataValues.id "+games[1].dataValues.id);
          
          
          // hit usergamecontroller by games pulled from initial user, put users associated with them in an array of objects that include geocode data.

          // map game ids out of games and run getgamers for each
          return games.map((game) => {
            let gameNum = game.dataValues.id;
            console.log("gameNum: "+gameNum);
 
               return
              db
              .Game
              .findAll({
                include: [
                {
                  model: db.User,
                  through: db.UserGame,
                  },
                
              ],
                where: {
                  id: gameNum
                },
                
              })

              // this works here, but I can't get it outside of function
              // .then(dbGame => {
              //   console.log("returned within map "+ JSON.stringify(dbGame[0].Users));
              //   temp = dbGame[0].Users;
              //   return dbGame[0].Users;
              // });
              // .catch(err => {
              //   console.log(err);
              //   res.status(404).json(err);
              // });
            
            
          });
          
          
          

        })
        .then(dbGame => {
          console.log("returned from map "+ JSON.stringify(dbGame));
          // temp = dbGame[0].Users;
          return games;
        })
        .then(data => res.json(data))
        .catch(err => {
          console.log(err);
          res.status(404).json(err);
        });
    // };


    //  compare user geocode to each pulled user geocode, adding distance between to new key/value in each user object

    //  sort array by distance variable

    // take first thirty closest users and return them in an array





    // set turf from point as coordinates


    // let coordinates = [req.latitude, req.longitude];
    // let from = turf.point(coordinates);

    // finish later
  }
}