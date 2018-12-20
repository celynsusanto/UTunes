const express = require('express')
const router = express.Router()
const Model = require('../models')

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


module.exports = router