const express = require('express')
const router = express.Router()
const Model = require('../models')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.use(express.static('uploads'))
// router.use((req, res, next) => {
//     if (req.session.user) {
//         next()
//     } else {
//         res.send('Tidak dapat akses')
//     }
// })
router.get('/', (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/login")
        // res.redirect('/')
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

router.get('/:id/list', (req, res) => {
    Model.Playlist.findOne({
        include: {model: Model.Song},
    }, {where: {id: req.params.id}})
    .then(list => {
        // res.send(list)  
        res.render('./pages/listPlaylist', {songs: list.Songs, id: req.params.id})
    })
    .catch(err => {
        res.send(err)
    })
})



module.exports = router