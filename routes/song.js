const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/:playlistId', (req, res) => {
    Model.Song
    .findAll()
    .then((song) => {
        let theId = req.params.playlistId
        res.render('./pages/songList', {song: song, id: theId})
    })
    .catch((err) => {
        res.send(err)
    })
})

router.post('/:playlistId/:songId', (req, res) => {
    let userData = null
    Model.Playlist.findByPk(req.params.playlistId)
    .then(playlist => {
        return Model.User.findByPk(playlist.UserId)
    })
    .then(user => {
        userData = user
        return Model.Song.findByPk(req.params.songId)
    })
    .then(song => {
        if (userData.membership === 'freemium' && song.songTag === 'premium') {
            throw `Lagu ini hanya khusus untuk pelanggan premium.`
        } else {
            return Model.PlaylistSong.create({
                SongId: req.params.songId,
                PlaylistId: req.params.playlistId                
            })
        }
    })
    .then(() => {
        // res.redirect('/playlists')
        // res.redirect(`/playlists/${req.params.playlistId}/list`, {song: song})
        res.redirect(`/songs/${req.params.playlistId}`)
    })
    // Model.PlaylistSong
    // .create({
    //     SongId: req.params.songId,
    //     PlaylistId: req.params.playlistId
    // })
    // .then(() => {
    //     return Model.Playlist
    //     .findAll({include: {model: Model.Song}},{where: {id: playlistId}})
    // })
    // .then(playlist => {
    //     // res.send(playlist)
    //     res.redirect('/playlists/:playlistId/list', {song: song})
    // })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router