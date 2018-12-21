const express = require('express')
const router = express.Router()
const Model = require('../models')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({dest: 'public/uploads'})

router.get('/', (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/login")
    }
}, (req, res) =>{
    let theId = req.session.user.id
    Model.User.findByPk(theId, {include: {model: Model.Playlist}})
    .then(user => {
        res.render('./pages/playlist', {user: user}) 
    })
    .catch(err => {
        res.send(err)
    })
})
        
router.post('/', (req, res) => {
    Model.Playlist
    .create({
        name: req.body["Playlist Name"],
        UserId: req.session.user.id
    })
    .then(() => {
        res.redirect('/playlists')
    })
    .catch((err) => {
        res.send(err)
    })
})

router.get('/delete/:id', (req, res) => {
    Model.Playlist
    .destroy({where: {
        id: req.params.id
    }})
    .then(() => {
        res.redirect('/playlists')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/list/:id', (req, res) => {
    Model.Playlist.findByPk(req.params.id, {
        include: {model: Model.Song}
    })
    .then(list => {
        res.render('./pages/listPlaylist', {url: list.Songs[0].url, songs: list.Songs, id: req.params.id})
    })
    .catch(err => {
        res.send(err)
    })
})



module.exports = router