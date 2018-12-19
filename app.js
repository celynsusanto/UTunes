const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const users = require('./routes/user')
const playlists = require('./routes/playlist')
const home = require('./routes/home')
// app.use(express.static)
app.set('view engine', 'ejs')
app.use(session({
    secret: 'utunes'
}))
app.use(express.urlencoded({extended: false}))

app.use('/', home)
app.use('/users', users)
app.use('/playlists', playlists)


app.get('/register', (req, res) => {
    res.render('./pages/registerPage')
})

app.post('/register', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})