const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/:playlistId', (req, res) => {
    // res.send(req.params.playlistId)
    Model.Song
    .findAll()
    .then((song) => {
        // res.send(req.params.playlistId)
        let theId = req.params.playlistId
        res.render('./pages/songList', {song: song, id: theId})
    })
    .catch((err) => {
        res.send(err)
    })
})

router.post('/:playlistId/:songId', (req, res) => {
    // res.send(req.params.songId)
    // console.log(req.params.playlistId)
    Model.PlaylistSong
    .create({
        SongId: req.params.songId,
        PlaylistId: req.params.playlistId
    })
    .then(() => {
        return Model.Playlist
        .findAll({include: {model: Model.Song}},{where: {id: playlistId}})
    })
    .then(playlist => {
        // res.send(playlist)
        res.redirect('/playlists/:playlistId/list', {song: song})
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router