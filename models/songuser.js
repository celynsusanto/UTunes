'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongUser = sequelize.define('SongUser', {
    UserId: DataTypes.INTEGER,
    SongId: DataTypes.INTEGER
  }, {});
  SongUser.associate = function(models) {
    // associations can be defined here
  };
  return SongUser;
};