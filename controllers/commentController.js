const Comment = require('../models/comment');
const { validateCommentForm } = require('../lib/validators');

exports.createComment = [
  validateCommentForm(),
  (req, res, next) => {
    const newComment = new Comment({
      name: req.body.name,
      message: req.body.message,
      post: req.body.postid,
    });
    newComment.save((err, message) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        success: true,
        messageCreated: message,
      });
    });
  },
];
