const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const users = require('./routes/user')
const playlists = require('./routes/playlist')
const home = require('./routes/home')
// app.use(express.static)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', home)
// app.use(session({
//     secret:
// }))
app.use('/users', users)
app.use('/playlists', playlists)



app.listen(port, () => {
    console.log(`Server is listening to port ${port}`)
})