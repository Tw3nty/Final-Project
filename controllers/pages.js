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

exports.addmerch = function (req, res) {
    res.render('addmerch', {title:'Add Merch'})
}

exports.adminfail = function (req, res) {
    res.render('adminfail', {title:'Admin Fail'})
}
