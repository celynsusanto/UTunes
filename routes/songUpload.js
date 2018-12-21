const express = require('express')
const router = express.Router()
const Model = require('../models')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage })


router.get('/', (req, res) => {
    res.render('./pages/addSongs')
})

router.post('/', upload.single('music'), function (req, res, next) {
    // req.file is the `avatar` file

    let parseData = req.file.originalname.split(' - ') 
    let artist = parseData[0]
    let semiTitle = parseData[1].split('.')
    let title = semiTitle[0]
    let randomizeTag = ['free', 'premium']
    let random = randomizeTag[Math.floor(Math.random() * randomizeTag.length)]
    Model.Artist.create({
        name: artist,
        createdAt: new Date,
        updatedAt: new Date
    })
    .then((data) => {
        return Model.Song.create({
            title: title,
            songTag: random,
            url: `${req.file.filename}.mp3`,
            ArtistId: data.id,
            createdAt: new Date,
            updatedAt: new Date
        })
    })
    .then(() => {
        res.send('berhasil')
    })
    .catch(err => {
        res.send(err)
    })
    
    // req.body will hold the text fields, if there were any
  })
   module.exports = router