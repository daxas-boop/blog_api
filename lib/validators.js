const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

const validateRegistration = () => [
  body('username').trim().isLength({ min: 1 }).withMessage('Enter a username.').escape(),
  body('password').trim().isLength({ min: 1 }).withMessage('Enter a password.').escape(),
  body('confirm-password')
    .trim()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error('Password missmatch.');
    })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];

const validateLoginForm = () => [
  body('username').trim().isLength({ min: 1 }).withMessage('Enter a username').escape(),
  body('password').trim().isLength({ min: 1 }).withMessage('Enter a password').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];

const validateCommentForm = () => [
  body('message').trim().isLength({ min: 1 }).withMessage('Enter a message.').escape(),
  body('name').trim().isLength({ min: 1 }).withMessage('Enter a name.').escape(),
  body('postid')
    .custom(async (value) => {
      try {
        const post = await Post.findById(value);
        if (post !== null) {
          return Promise.resolve();
        }
        return Promise.reject();
      } catch (e) {
        return Promise.reject();
      }
    })
    .withMessage('The post id was not found'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        commentSent: {
          name: req.body.name,
          message: req.body.message,
        },
        errors: errors.array(),
      });
    } else {
      next();
    }
  },
];

const validateCreatePost = () => [
  body('title').trim().isLength({ min: 1 }).withMessage('The title cannot be empty.').escape(),
  body('body').trim().isLength({ min: 1 }).withMessage('The body cannot be empty.').escape(),
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
      next();
    }
  },
];

module.exports = {
  validateLoginForm,
  validateRegistration,
  validateCommentForm,
  validateCreatePost,
};
