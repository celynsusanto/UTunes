'use strict';
const encrypt = require('../helpers/encryption.js')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    secret: DataTypes.STRING,
    membership: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (value) => {
        let generate = encrypt(value.password);
        value.password = generate.hash;
        value.secret = generate.secret;
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Playlist)
    User.belongsToMany(models.Song, {through: models.SongUser})
  };
  return User;
};