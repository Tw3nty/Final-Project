var Post = require('../models/merchSchema.js')

exports.post = function (req, res) {
 console.log('received new post.')

 console.log(req.body)

 var newMerch = new Post( {type: req.body.type, content:   req.body.content, myimage:   req.body.myimage,} );
 newMerch.save(function (err) {
   if (err) {
     console.log(err)
     return
   }
     res.render('addedmerch',  {title:'added merch'})
 });

}

// exports.posts = function (req, res){
//   Post.find({}, function (err, docs) {
//     console.log('received')
//     console.log(docs)
//
//     res.render('posts', {posts: docs, user: req.user ? req.user:null, title:'posts'})
//   });
// }


exports.tees = function (req, res) {
  res.render('tees', {title:'tees'})
}

exports.hoodies = function (req, res) {
  res.render('hoodies', {title:'hoodies'})
}

exports.accessories = function (req, res) {
  res.render('accessories', {title:'accessories'})
}
