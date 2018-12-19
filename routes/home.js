const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
    res.render('homepage')
})
router.get('/login', (req, res) => {
    res.render('loginPage')
})

module.exports = router