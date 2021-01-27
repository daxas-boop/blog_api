const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/', postController.viewAllPosts);
router.post('/', postController.createPost);
router.get('/:postId', postController.viewPost);
router.patch('/:postId', postController.editPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
