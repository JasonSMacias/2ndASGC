module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      
      allowNull: false,
      
      validate: {
        len: [1, 125]
      }
    }
  });

  Game.associate = function (models) {
    models.Game.belongsToMany(models.User, {
      through: "UserGame"
    });
    // models.Game.belongsToMany(models.Site, {
    //   through: "UserSite"
    // })
  };

  return Game;
};