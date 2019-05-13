exports.login = function (req, res){
    console.log('received')
  res.render('login', {title:'login'})
}

exports.signup = function (req, res){
   console.log('received')
   res.render('signup', {title:'signup'})
}

exports.home = function (req, res) {
  res.render('home', {title:'home'})
}
