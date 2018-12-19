const express = require('express')
const app = express()
const port = 3000
const users = require('./routes/user')
const playlists = require('./routes/playlist')
// app.use(express.static)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use('/users', users)
app.use('/playlists', playlists)

app.get('/', (req, res) => {
    res.render('./pages/homepage')
})

app.get('/register', (req, res) => {
    res.render('./pages/registerPage')
})

app.post('/register', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})