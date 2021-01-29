const express = require('express');
const passport = require('passport');

const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/', postController.viewAllPosts);
router.get('/:postId', postController.viewPost);
router.post('/', passport.authenticate('jwt', { session: false }), postController.createPost);
router.patch('/:postId', passport.authenticate('jwt', { session: false }), postController.editPost);
router.delete('/:postId', passport.authenticate('jwt', { session: false }), postController.deletePost);

module.exports = router;
