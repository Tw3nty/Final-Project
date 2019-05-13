var Post = require('../models/merchSchema.js')

exports.addmerch = function (req, res) {
  console.log('received')
  res.render('addmerch', {title:'Add Merch'})
}
