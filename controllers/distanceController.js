const db = require('../models');

// const turfDistance = require('@turf/distance');

module.exports = {
  // compare coordinates sent in latitude and longitude in req.body to coordinates of other users in db where a match exists with one of the games in game interest array sent in req.body, return sorted list of nearest users with matching game interests. or maybe just send user id and set up promise chain to get coordinates, games, then get users with matching games, get coordinates for each, use turf distance to set a distance for each, and sort, then return sorted list.
  findNear = function(req, res) {
    // req.body will include user id
    
    // temporary db stuff to keep program working until i add actual functionality
     db
      .Game
      .findAll({})
      .then(dbGames => res.json(dbGames))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });



    // set turf from point as coordinates


    // let coordinates = [req.latitude, req.longitude];
    // let from = turf.point(coordinates);

    // finish later
  }
}