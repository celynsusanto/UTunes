const express = require('express')
const router = express.Router()
const Model = require('../models')
const syncPassword = require('../helpers/syncPassword')

router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        res.render('./pages/homepage.ejs')
    } else {
        res.render('./pages/homepageUser.ejs')
    }
})

router.get('/login', (req, res) => {
    let err = req.query.error
    res.render('./pages/loginPage.ejs', {
        err: err
    })
})

router.post('/login', (req, res) => {
    let userLogin = req.body 
    let userData = null
    Model.User
    .findOne({where: {username: userLogin.username}})
    .then((usernameChecking) => {
        if (!usernameChecking) {
            throw 'Username Tidak Ditemukan'
        } else {
            userData = usernameChecking
            let syncPassWithHash = syncPassword(req.body.password, userData.secret)
            return Model.User.findOne({
                where: {password: syncPassWithHash}
            })
        }
    })
    .then(passwordChecking => {
        if (passwordChecking === null) {
            throw 'Password Salah'
        } else {
            req.session.user = {
                id: passwordChecking.id,
                username: passwordChecking.username,
                membership: passwordChecking.membership,
                balance: passwordChecking.balance
            }
                res.redirect('/')
        }
    })

    .catch((err) => {
        res.redirect(`/login?error=${err}`)
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
        res.redirect('/login')
    })
    .catch((err) => {
        res.send(err)
    })
})

router.get('/profile', (req, res) => {
    res.render('./pages/profilePage')
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.send(err)    
        } else {
            res.send('Logout Succeed')
        }
    })
})

module.exports = router