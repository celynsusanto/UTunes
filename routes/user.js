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

router.get('/delete/:id', (req, res) => {
    Model.User.destroy(req.params.id)
    .then(() => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router