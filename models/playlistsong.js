'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define('PlaylistSong', {
    SongId: DataTypes.INTEGER,
    PlaylistId: DataTypes.INTEGER
  }, {});
  PlaylistSong.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistSong;
};