const express = require('express')
const app = express()
const port = 3000

//models
var Post = require('./models/merchSchema.js')
var User = require('./models/User.js')

app.set('view engine', 'pug')
app.use(express.static('public'))

//controllers
var ControllerPosts = require('./controllers/posts.js')
// var ControllerUsers = require('./controllers/users.js')
var ControllerPages = require('./controllers/pages.js')


//routes
app.get('/login', ControllerPages.login)
app.get('/signup', ControllerPages.signup)
app.get('/', ControllerPages.home)
app.get('/addmerch', ControllerPosts.addmerch)
app.get('/tees', ControllerPages.tees)
app.get('/hoodies', ControllerPages.hoodies)
app.get('/accessories', ControllerPages.accessories)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
