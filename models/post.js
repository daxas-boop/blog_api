const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostInstance = new Schema({
  title: String,
  body: String,
  published: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

exports.mongoose.model('Post', PostInstance);
