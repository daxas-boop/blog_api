const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserInstance = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  password: String,
});

exports.mongoose.model('User', UserInstance);
