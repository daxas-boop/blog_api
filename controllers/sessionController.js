const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.handleLogin = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a username')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a password')
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Errors
      res.status(400).json({
        errors: errors.array(),
      });
    } else {
      // Success
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          res.status(401).json({ message: 'User not found' });
        }

        // TODO
      });
    }
  },
];

exports.handleLogout = (req, res) => {
  req.logout();
};
