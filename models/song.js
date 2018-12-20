'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    songTag: DataTypes.STRING,
    url: DataTypes.STRING,
    ArtistId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsToMany(models.Playlist, {through: models.PlaylistSong})
  };

  return Song;
};