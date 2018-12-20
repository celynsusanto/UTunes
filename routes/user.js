const express = require('express')
const router = express.Router()
const Model = require('../models')
const encryption = require('../helpers/encryption')

router.get('/', (req, res) => {
    Model.User.findByPk(req.session.user.id)
    .then(user => {
        res.render('./pages/homepageUser', {id: user.id})
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/profile', (req, res) => {
    res.render('./pages/profilePage', {id: req.params.id})
})

router.get('/:id/profile/edit', (req, res) => {
    Model.User.findByPk(req.params.id)
    .then(user => {
        res.render('./pages/editProfile.ejs', {
            user: user
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/profile/edit', (req, res) => {
    Model.User.update({
        id: req.params.id,
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: encryption(req.body.password).hash,
        secret: encryption(req.body.password).secret
    }, {where: {id: req.params.id}})
    .then(() => {
        res.redirect(`/users/${req.params.id}/profile`)
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/profile/upgrade', (req, res) => {
    let err = req.query.error
    Model.User.findByPk(req.params.id)
    .then(() => {
        res.render('./pages/upgradeMembership', {id: req.params.id.trim(), err: err})
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/profile/upgrade', (req, res) => { 
    Model.User.findByPk(req.params.id)
    .then((user) => {
        return Model.User.update({
            membership: 'premium'
        }, {where: {id: req.params.id}})
    })
    .then(() => {
        res.redirect(`/users/${req.params.id}/profile`)
    })
    .catch(err => {
        res.redirect(`/users/${req.params.id}/profile/upgrade?error=${err}`)
    })
})

// router.get('/:id/profile/topup', (req, res) => {
//     res.render('./pages/topup')
// })


//MIDDLEWARE
// router.get('/:id', (req, res, next) => {
//    // cek session 
// }, (req, res) => {
//     res.send("hello")
// })

// router.get('/delete/:id', (req, res) => {
//     Model.User.destroy({
//         where: {id: req.params.id}
//     })
//     .then(() => {
//         res.redirect('/')
//     })
//     .catch(err => {
//         res.send(err)
//     })
// })

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