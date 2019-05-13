var User = require('../models/User.js')
const saltRounds = 10;
const bcrypt = require('bcrypt');
//actually set the consts to the schema, Brandan!
exports.signedin = function (req, res) {
  const email= req.body.email
  const username =req.body.uname
  const password = req.body.psw
  const passwordConfirmation= req.body.pswrepeat


  if (username === '' || email === '' || password === '' || passwordConfirmation === ''){
    res.send('<h1> Please be certain you filled all of the form. </h1>')
    return
  }

  if (password !== passwordConfirmation) {
    res.send('<h1> Passwords do not match. </h1>')
    return
  }

  bcrypt.hash(password, saltRounds, function(err, hash){
    var user = new User({email: email, uname: username, psw: hash})
    user.save(function(err, savedUser){
      if (err) {
        console.log(err)
        res.send('<h1> Something went wrong. Email me with the error. </h1>')
        return
      }
      console.log('New user created')
      console.log(savedUser)
      res.render('signedup', {title:'signed up'})
    })
  });
}

exports.loggedin = function (req, res){
  const username = req.body.uname
  const password = req.body.psw
  console.log('logging in')
  if(username === '' || password === ''){
    res.send('<h1> Please be certain you filled all of the form. </h1>')
  }

  User.findOne( {uname: username} , function(err, user) {
    console.log('logging in2')
    if (err) {
      console.log(err)
      res.send('<h1> Something went wrong. Email me with the error. </h1>')
      return
    }

    bcrypt.compare(password, user.psw, function(err, result) {
      if(result === false){
        res.send('<h1>Incorrect password</h1>')
      }
      res.render('loggedin', {title:'login'})
    })

  })
res.send('major error')
}
