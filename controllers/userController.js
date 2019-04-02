const db = require('../models');

const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

var options = {
  provider: 'mapquest',
  apiKey: process.env.MAPQUEST_KEY,
};

var geocoder = NodeGeocoder(options);

module.exports = {
  findAll: function(req, res) {
    db
      .User
      .findAll({
        attributes: ["id", "name", "username", "email", "address"]
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findByName: function (req, res) {
    db
      .User
      .findOne({
        attributes: ["id", "name", "username", "email", "address"],
        where: {
          username: req.params.username
        },
        
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  userCheck: function(req, res) {
    if (req.user) {
      return res.json({
        id: req.user.id, 
        username: req.user.username,
        address: req.user.address,
        geocodeLocation: req.user.geocodeLocation,
        name: req.user.name
      });
    }
    else {
      return res.status(422).json({error: "Not logged in!"})
    }
  },
  update: function (req, res) {
    db
      .User
      .update(req.body, {
        where: {
          username: req.params.username
        }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },  

  addAddress: function (req, res) {
    //  Here is where the problem is
    geocoder.geocode(req.body)
      .then(function(res) {
        console.log(res);
        let newJson = {geocodeLocation: res[0]}
        console.log("NewJson"+newJson);
        db
          .User
          .update(newJson, {
            where: {
              id: req.body.id
            }
          })
          .then(dbUsers => dbUsers)
          .catch(err => {
            console.log(err);
            // res.status(500).json(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
    
    res.end;
    
  },

  delete: function (req, res) {
    db
      .User
      .destroy({
        where: {
          username: req.params.username
        }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  register: function(req, res) {
    /* 
      req.body => {
        name: "",
        userName: "",
        email: "",
        password: "",
        address: ""
      }
    */
    db
      .User
      .create(req.body)
      .then(function (userInfo) {
        // Upon successful signup, log user in
        req
          .login(userInfo, function (err) {
            if (err) {
              console.log(err)
              return res
                .status(422)
                .json(err);
            }
          
            console.log(req.user);
            return res.json(userInfo);
          });
      })
      .catch(function (err) {
        console.log("Your password or email is not correct!"+err);

        res
          .status(422)
          .json(err);
      });
  },
  login: function(req, res) {
    console.log(req.user);
    res.json("/");
  },

  findById: function(req, res){
     db
      .User
      .findOne({
      //   include: [
      //   {
      //     model: db.Group,
      //     include: [db.VacationOptions],
      //     through: db.Usergroup,
      //     },
        
      // ],
        where: {
          id: req.params.id
        },
        
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },

  updateById: function(req, res){
  
    db
      .User
      .update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
}