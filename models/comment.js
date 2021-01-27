const mongoose = require('mongoose');

const { Schema } = mongoose;

const CommentInstance = new Schema({
  body: String,
  created_by: String,
  created_at: String,
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

exports.mongoose.model('Comment', CommentInstance);
