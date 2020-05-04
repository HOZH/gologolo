var mongoose = require('mongoose');
var {LogoSchema} = require("../models/Logo");


var UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  username:String,
  password:String,
  firstName:String,
  lastName:String,
  age: Number,
  logos: [LogoSchema]

});

module.exports = mongoose.model('User', UserSchema);