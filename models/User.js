var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true},
  uname: { type: String, required: true, unique: true},
  psw: { type: String, required: true},
});
var User= mongoose.model('user', userSchema);
module.exports= User;
