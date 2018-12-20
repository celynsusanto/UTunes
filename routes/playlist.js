const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/:userId', (req, res) => {
    res.send(req.session)
    // Model.Playlist
    // .findAll({where: {
    //     id: req.session.user.id
    // }})
    // .then((playlist) => {
    //     res.send(playlist)
    // })
    // res.render('./pages/playlist')
})

router.get('/:userId/createPlaylist', (req, res) => {
    res.render()
})


module.exports = router