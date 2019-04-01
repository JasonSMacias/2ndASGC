const db = require('../models');
const usergameController = require('./usergameController');

const {point} = require('@turf/helpers');
const distance = require('@turf/distance');

module.exports = {
  // compare coordinates sent in latitude and longitude in req.body to coordinates of other users in db where a match exists with one of the games in game interest array sent in req.body, return sorted list of nearest users with matching game interests. or maybe just send user id and set up promise chain to get coordinates, games, then get users with matching games, get coordinates for each, use turf distance to set a distance for each, and sort, then return sorted list.
  findNear: async function (req, res) {
    let geocodeCoordinates = {};
    let games = [];
    const searchingUserId = req.params.id;
    console.log("User doing the search: " + searchingUserId);


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
      geocodeCoordinates = [users.geocodeLocation.longitude, users.geocodeLocation.latitude];
      games = users.Games;
      console.log("Geocode Coordinates: " + JSON.stringify(geocodeCoordinates));
      console.log("Games[0].dataValues.id " + games[1].dataValues.id);
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

          console.log("gameNum: " + gameNum);

          const gamers = await findGamerByGame(gameNum);

          return gamers;
        });

        const finalArray = await Promise.all(rawGamesArray).then((completed) => {
          // console.log("result ===== "+ JSON.stringify(completed[0]));
          // console.log("result ===== "+ JSON.stringify(completed[1]));
          return completed;
        });

        // console.log("++++++  Final  +++++++"+finalArray);

        return finalArray;

      };

      const getstuff = async () => {
        const gamers = await gamesGamers();
        // console.log('gamers: '+gamers);
        return gamers;
      };
      return getstuff();
    };

    // mapped array contains an array of game objects, each of which contains an array of users and their information, including geocode
    const mappedArray = await mapper();
    console.log("Mapped Array =======> " + mappedArray);

    // Pulling users from each array (games) within mappedArray, excluding requesting user and duplicates
    let usersFromMappedArray = [];
    mappedArray.forEach(game => {
      console.log("GAME     " + JSON.stringify(game[0]));
      // looping over each user in a given game object and pushing into usersFromMappedArray
      for (let x of game[0].Users) {
        // get current user ids from usersFromMappedArray
        let currentUserIds = [];
        for (let x of usersFromMappedArray) {
          currentUserIds.push(x.id);
        }
        console.log("====================== "+currentUserIds+" ===================");

        if (x.id == searchingUserId || currentUserIds.includes(x.id)) {

          console.log("id " + x.id + "didn't go in.");
        }
        else {
          usersFromMappedArray.push(
            {
              id: x.id,
              name: x.name,
              email: x.email,
              username: x.username,
              geocodeLocation: x.geocodeLocation,
              distanceFrom: null
            }
          );
        }

      };
      console.log("users from mapped array:     " + JSON.stringify(usersFromMappedArray));

      return false;
    });

    //  compare user geocode to each pulled user geocode, adding distance between in user object under distanceFrom (which defaults to null)

    // working example of measuring 2 points
    // var from = point([-120.24, 39.21]);
    // var to = point([-122.5, 37.7]);
    // var options = {units: 'miles'};
    
    // var distanceTo = distance(from, to);
    // console.log(distanceTo);

    for (let x of usersFromMappedArray) {
      let from = point(geocodeCoordinates);
      let to = point([x.geocodeLocation.longitude, x.geocodeLocation.latitude]);
      let options = {units: "miles"};
      let distanceTo = distance(from, to, options);
      console.log(`-------- Distance to ${x.username} is ${distanceTo} miles -----------`);
      x.distanceFrom = distanceTo;
    };
    console.log("Modified array:     "+JSON.stringify(usersFromMappedArray));

    //  sort array by distance variable
    

    // take first thirty closest users and return them in an array



    // sending unsorted usersFromMappedArray for now
    res.json(usersFromMappedArray);
  }
}