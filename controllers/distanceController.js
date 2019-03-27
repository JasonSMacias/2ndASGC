const db = require('../models');
const usergameController = require('./usergameController');

// const turfDistance = require('@turf/distance');

module.exports = {
  // compare coordinates sent in latitude and longitude in req.body to coordinates of other users in db where a match exists with one of the games in game interest array sent in req.body, return sorted list of nearest users with matching game interests. or maybe just send user id and set up promise chain to get coordinates, games, then get users with matching games, get coordinates for each, use turf distance to set a distance for each, and sort, then return sorted list.
  findNear: function(req, res) {
    
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
          // userData = res.json(dbUser);
          console.log(dbUser);
          res.json(dbUser);
        })
        .catch(err => {
          console.log(err);
          res.status(404).json(err);
        });
    // };

    // hit usercontroller by games pulled from initial user, put users associated with them in an array of objects that include geocode data.

    //  compare user geocode to each pulled user geocode, adding distance between to new key/value in each user object

    //  sort array by distance variable

    // take first thirty closest users and return them in an array





    // set turf from point as coordinates


    // let coordinates = [req.latitude, req.longitude];
    // let from = turf.point(coordinates);

    // finish later
  }
}