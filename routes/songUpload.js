const express = require('express')
const router = express.Router()
const Model = require('../models')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.use(express.static('uploads'))

router.get('/', (req, res) => {
    res.render('./pages/addSongs')
})

router.post('/', upload.single('music'), function (req, res, next) {
    // req.file is the `avatar` file
    console.log(req.file)
    // req.body will hold the text fields, if there were any
  })
   module.exports = router