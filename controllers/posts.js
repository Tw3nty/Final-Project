var Merch = require('../models/merchSchema.js')

exports.addedmerch = function (req, res) {
 console.log('received new post.')

 console.log(req.body)

 var newMerch = new Merch( {title: req.body.title, type: req.body.type, merch: req.body.merch, description: req.body.description, cost: req.body.cost,} );
 newMerch.save(function (err) {
   if (err) {
     console.log(err)
     return
   }
     res.render('addedmerch',  {title:'added merch'})
 });

}

exports.tees = function (req, res){
  Merch.find({}, function (err, docs) {
    console.log('received')
    console.log(docs)

    res.render('tees', {merch1: docs, user: req.user ? req.user:null, title:'tees'})
  });
}

exports.accessories = function (req, res){
  Merch.find({}, function (err, docs) {
    console.log('received')
    console.log(docs)

    res.render('accessories', {merch2: docs, user: req.user ? req.user:null, title:'accessories'})
  });
}

exports.hoodies = function (req, res){
  Merch.find({}, function (err, docs) {
    console.log('received')
    console.log(docs)

    res.render('hoodies', {merch3: docs, user: req.user ? req.user:null, title:'hoodies'})
  });
}
