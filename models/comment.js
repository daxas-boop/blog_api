const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentInstance = new Schema({
  name: String,
  message: String,
  created_at: { type: Date, default: Date.now() },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Comment', CommentInstance);
