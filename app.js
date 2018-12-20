const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const users = require('./routes/user')
const playlists = require('./routes/playlist')
const home = require('./routes/home')
const upload = require('./routes/songUpload')
const Model = require('./models')
const song = require('./routes/song')


app.use(express.static('uploads'))
app.set('view engine', 'ejs')

app.use(session({
    secret: 'utunes'
}))
app.use(express.urlencoded({extended: false}))
app.get('/delete/:id', (req, res) => {
    Model.Artist.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.send('berhasil')
    })
    .catch(err => {
        res.send(err)
    })
})
app.use('/', home)
app.use('/users', users)
app.use('/playlists', playlists)
app.use('/uploads', upload)
app.use('/songs', song)

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})