const express = require('express')
const app = express()
const port = 3000
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');


//passport
const session = require("express-session")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

//models
var Merch = require('./models/merchSchema.js')
var User = require('./models/User.js')

app.set('view engine', 'pug')
app.use(express.static('public'))

//controllers
var ControllerPosts = require('./controllers/posts.js')
var ControllerUsers = require('./controllers/users.js')
var ControllerPages = require('./controllers/pages.js')

app.set('view engine', 'pug')
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('running local strats')
    User.findOne({ uname: username }, function(err, user) {
      console.log('in')
      if (err) {
        console.log(err)
        return done(err);
      }
      if (user === null){
        console.log('user not found')
        return done(null, false, {message: 'Incorrect username.'});
      }
      bcrypt.compare(password, user.psw, function(err, result){
        if (result === false) {
          console.log('Incorrect Password')
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      })
    });
  }
));

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: false }) );

function isLoggedIn(req, res, next){
  console.log(req.user)
  if(req.user === undefined){
    res.redirect('/login')
    return
  }
  next()
}

function isAdmin(req, res, next){
  console.log(req.user)
  if(req.user !== undefined){
    if(req.user.uname !== 'Tw3nty'){
      res.redirect('/adminfail')
      return
    }
  }else if (req.user === undefined){
    res.redirect('/login')
    return
  }
  next()
}

//routes
app.get('/login', ControllerPages.login)
app.get('/signup', ControllerPages.signup)
app.get('/', ControllerPages.home)
app.get('/addmerch', isAdmin, ControllerPages.addmerch)
app.get('/tees', isLoggedIn, ControllerPosts.tees)
app.get('/hoodies', isLoggedIn, ControllerPosts.hoodies)
app.get('/accessories', isLoggedIn, ControllerPosts.accessories)
app.get('/adminfail', ControllerPages.adminfail)
app.post('/signup', ControllerUsers.signedin)
app.post('/added-merch', ControllerPosts.addedmerch)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
