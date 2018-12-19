const express = require('express')
const router = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
    res.render('./pages/homepage.ejs')
})

router.get('/login', (req, res) => {
    res.render('./pages/loginPage.ejs')
})

router.post('/login', (req, res) => {
    res.send(req.body)
})

module.exports = router