const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
    Model.User.findAll({
        include: [{
            model: Model.Song
        }]
    })
    .then(allData => {
        res.send(allData)
    })
    .catch(err => {
        res.send(err)
    })
})


// router.get('/:id', (req, res, next) => {
//    // cek session 
// }, (req, res) => {
//     res.send("hello")
// })
router.get('/delete/:id', (req, res) => {
    Model.User.destroy(req.params.id)
    .then(() => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send(err)
        } else {
            res.redirect('/')
        }
    })
})


module.exports = router