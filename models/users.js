// for passport implementation
const bcryptjs = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a table from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our table is between 1 and 140 characters
      validate: {
        len: [1, 125]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255]
      }
    },
    email: {
       type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 255]
      }
    },
    geocodeLocation: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // User.associate = function (models) {
  //   models.User.belongsToMany(models.Game, {
  //     through: "UserGame"
  //   });
  //   models.User.belongsToMany(models.Site, {
  //     through: "UserSite"
  //   })
  // };

  // Next two sections for passport implementation
  // create method for all user objects to use for passport
  User.prototype.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
  }

  User.hook("beforeCreate", function(user) {
    user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10), null);
  });

  return User;
};