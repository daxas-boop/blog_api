const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserInstance = new Schema({
  username: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model('User', UserInstance);
