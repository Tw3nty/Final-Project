var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var merchSchema = new Schema({
    title:  {type:String, required:true},
    type: {type:String, required:true},
    merch: {type:String, required:true},
    description: {type:String, required:true},
    cost: {type:String, required:true},
  });
var Post = mongoose.model('Post', merchSchema)
module.exports = Post;
