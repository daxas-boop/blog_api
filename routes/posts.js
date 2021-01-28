const express = require('express');

const router = express.Router();
const postController = require('../controllers/postController.js');

router.get('/', postController.viewAllPosts);
router.get('/:postId', postController.viewPost);
router.post('/', postController.createPost);
router.patch('/:postId', postController.editPost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
