const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createComment = [
  body('body')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a message.')
    .escape(),
  body('created_by')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a name.')
    .escape(),
  body('postid')
    .custom(async (value) => {
      const post = await Post.findById(value);
      if (post !== null) {
        Promise.resolve();
      }
      Promise.reject();
    })
    .withMessage('The post id was not found'),
  (req, res, next) => {
    const errors = validationResult(req);

    const newComment = new Comment({
      body: req.body.body,
      created_by: req.body.created_by,
      post: req.body.postid,
    });

    if (!errors.isEmpty()) {
      // Error
      res.status(400).json({
        messageSent: {
          body: req.body.body,
          created_by: req.body.created_by,
        },
        errors: errors.array(),
      });
    } else {
      // Success
      newComment.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: 'Comment created',
        });
      });
    }
  },
];
