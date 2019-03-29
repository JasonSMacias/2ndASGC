const db = require('../models');
const usergameController = require('./usergameController');

const turfDistance = require('@turf/distance');

module.exports = {
  // compare coordinates sent in latitude and longitude in req.body to coordinates of other users in db where a match exists with one of the games in game interest array sent in req.body, return sorted list of nearest users with matching game interests. or maybe just send user id and set up promise chain to get coordinates, games, then get users with matching games, get coordinates for each, use turf distance to set a distance for each, and sort, then return sorted list.
  findNear: function(req, res) {
      let geocode = {};
      let games = [];
      let gameIds;
      const searchingUserId = req.params.id;
      console.log("User doing the search: "+searchingUserId);
      
    
    // take userid in req.params and hit user db, pulling out games and geocode data and saving them in variables
    // function getUserData() {
      const getUserData = async () => {
        const response = await db
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
            
          });
        
        const users = await response;
        geocode = users.geocodeLocation;
        games = users.Games;
        console.log("Geocode: "+JSON.stringify(geocode));
        console.log("Games[0].dataValues.id "+games[1].dataValues.id);
        return users;
      };

      const mapper = async () => {
        // await users from GetUserData;
        const users = await getUserData();

        // map game ids out of games (global variable set in getuserdata) and run getgamers for each

        // setting up db function
        const findGamerByGame = async (gameNum) => {
          const gamers = await
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
              
            });
          
          return gamers;

        }

        const gamesGamers = async () => {

          const rawGamesArray = games.map(async (game) => {
            
            let gameNum = game.dataValues.id;

            // temporary line below, manually using 0 index value, which would be as above line in real map 
            // let gameNum = games[0].dataValues.id;


            console.log("gameNum: "+gameNum);

            const gamers = await findGamerByGame(gameNum);

            return gamers;
          });

          // Damn, it took forever to figure out that I had to use Promise.all with a .map :-/
          const finalArray = await Promise.all(rawGamesArray).then((completed) => {
            console.log("result ===== "+ JSON.stringify(completed[0]));
            console.log("result ===== "+ JSON.stringify(completed[1]));
            return completed;
          });

          console.log("++++++  Final  +++++++"+finalArray);
            
          return finalArray;
          
        };
        
        const getstuff = async () =>{
        const gamers = await gamesGamers();
        console.log('gamers: '+gamers);
        return gamers;
        };
        return getstuff();
      };
          
      mapper();



    //  compare user geocode to each pulled user geocode, adding distance between to new key/value in each user object

    //  sort array by distance variable

    // take first thirty closest users and return them in an array





    // set turf from point as coordinates


    // let coordinates = [req.latitude, req.longitude];
    // let from = turf.point(coordinates);

    // finish later
    res.end();
  }
}