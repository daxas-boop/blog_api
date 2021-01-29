const { generatePassword, validPassword, issueJwt } = require('../lib/utils');
const { validateLoginForm, validateRegistration } = require('../lib/validators');
const User = require('../models/user');

exports.handleLogin = [
  validateLoginForm(),
  (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ success: false, error: 'User not found' });
      }

      const isValidPassword = validPassword(req.body.password, user.hash, user.salt);

      if (isValidPassword) {
        const { token, expiresIn } = issueJwt(user);

        res.status(200).json({
          success: true,
          user: {
            _id: user._id,
            username: user.username,
          },
          token,
          expiresIn,
        });
      } else {
        res.status(401).json({
          success: false,
          error: 'Invalid password',
        });
      }
    });
  },
];

exports.handleRegister = [
  validateRegistration(),
  (req, res, next) => {
    const { hash, salt } = generatePassword(req.body.password);

    const newUser = new User({
      username: req.body.username,
      hash,
      salt,
    });

    newUser.save((err, user) => {
      if (err) {
        return next(err);
      }
      const { token, expiresIn } = issueJwt(user);

      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
        },
        token,
        expiresIn,
      });
    });
  },
];

// Not sure how to handle logout with jwt ** TODO
exports.handleLogout = (req, res) => {
  req.logout();
  res.status(200).json({
    success: true,
  });
};
