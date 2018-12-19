'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
    Artist.hasMany(models.Song)
  };
  return Artist;
};