'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsToMany(models.Song, {through: PlaylistSong})
    Playlist.belongsTo(models.User)
  };
  return Playlist;
};