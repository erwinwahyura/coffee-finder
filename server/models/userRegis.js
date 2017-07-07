'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  uuid: String,
  name: String,
  gender: String,
  email: String,
  username: String,
  password: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;
