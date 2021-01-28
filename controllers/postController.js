const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.viewAllPosts = (req, res, next) => {
  Post.find({})
    .populate('created_by')
    .exec((err, posts) => {
      if (err) {
        return next(err);
      }
      res.json({ posts });
    });
};

exports.viewPost = (req, res, next) => {
  Post.findById(req.params.postId)
    .populate('created_by')
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      res.json({ post });
    });
};

exports.createPost = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The title cannot be empty.')
    .escape(),
  body('body')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The body cannot be empty.')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Error
      res.status(400).json({
        postSent: {
          title: req.body.title,
          body: req.body.body,
        },
        errors: errors.array(),
      });
    } else {
      // Success
      const newPost = new Post({
        title: req.body.title,
        body: req.body.body,
        created_by: req.body.created_by,
      });

      newPost.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          message: 'Post sucessfully created.',
        });
      });
    }
  },
];

exports.editPost = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The title cannot be empty.')
    .escape(),
  body('body')
    .trim()
    .isLength({ min: 1 })
    .withMessage('The body cannot be empty.')
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        postSent: {
          title: req.body.title,
          body: req.body.body,
        },
        errors: errors.array(),
      });
    } else {
      const editedPost = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        created_at: req.body.created_at,
        created_by: req.body.created_by,
      });

      Post.findByIdAndUpdate(req.params.postId, editedPost, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: 'Post sucessfully updated.',
        });
      });
    }
  },
];

exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.postId, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      message: 'Post sucessfully deleted.',
    });
  });
};
