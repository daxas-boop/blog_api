const mongoose = require('mongoose');
const Post = require('../models/post');
const { validateCreatePost } = require('../lib/validators');

exports.viewAllPosts = (req, res, next) => {
  Post.find({})
    .populate('created_by')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ success: true, posts });
    });
};

exports.viewPost = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
    return res.status(400).json({ success: false, error: 'Invalid ID' });
  }
  Post.findOne({ _id: req.params.postId })
    .populate('created_by')
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (!post) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      res.status(200).json({ success: true, post });
    });
};

exports.createPost = [
  validateCreatePost(),
  (req, res, next) => {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      created_by: req.body.created_by,
    });

    newPost.save((err, post) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        success: true,
        postCreated: post,
      });
    });
  },
];

exports.editPost = [
  validateCreatePost(),
  (req, res, next) => {
    const editedPost = new Post({
      title: req.body.title,
      body: req.body.body,
      published: req.body.published,
      created_at: req.body.created_at,
      created_by: req.body.created_by,
      _id: req.params.postId,
    });

    Post.findByIdAndUpdate(req.params.postId, editedPost, (err, post) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        success: true,
        postEdited: post,
      });
    });
  },
];

exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.postId, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      success: true,
    });
  });
};
