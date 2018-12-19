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


app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})