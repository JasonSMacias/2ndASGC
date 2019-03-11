// var createError = require('http-errors');
const express = require("express");
const path = require("path");
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const passport = require("./utils/middleware/passport-local");
const session = require("express-session");

const PORT = process.env.PORT || 3001;

const routes = require('./routes');
const app = express();

// requiring models
var db = require('./models')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(express.static('public'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// turn on session and passport stuff for authentication
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, () => console.log("server up and running"));
});