const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authMiddleware, authRole } = require('../middleware/auth');

// Create post
router.post(
  '/',
  [
    authMiddleware,
    authRole('user'),
    [
      check('title', 'Title is required').notEmpty(),
      check('content', 'Content is required').notEmpty()
    ]
  ],
  PostController.createPost
);

// Get all posts
router.get('/', PostController.getAllPosts);

// Get post by ID
router.get('/:id', PostController.getPostById);

// Update post by ID
router.put(
  '/:id',
  [
    authMiddleware,
    authRole('user'),
    [
      check('title', 'Title is required').notEmpty(),
      check('content', 'Content is required').notEmpty()
    ]
  ],
  PostController.updatePostById
);

// Delete post by ID
router.delete('/:id', [authMiddleware, authRole('user')], PostController.deletePostById);

module.exports = router;
