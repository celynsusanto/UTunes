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
    // res.send(req.body)
    let userLogin = req.body 
    Model.User
    .findOne({where: {username: userLogin.username}})
    .then((user) => {
        if (!user) {
            res.redirect('/login')
        } else {
            req.session.user = {
                id: user.id,
                username: user.username
            }
            res.redirect('/')
        }
    })
    .catch((err) => {
        res.send(err)
    })
})

router.get('/register', (req, res) => {
    res.render('./pages/registerPage')
})

router.post('/register', (req, res) => {
    let userData = req.body
    Model.User.create({
        fullName: userData.fullName,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        gender: userData.gender
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = router