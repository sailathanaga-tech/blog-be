const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /api/posts - Get all posts
router.get('/', postController.getAllPosts);

// GET /api/posts/:id - Get a single post
router.get('/:id', postController.getPostById);

// POST /api/posts - Create a new post
router.post('/', postController.createPost);

// PUT /api/posts/:id - Update a post
router.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', postController.deletePost);

module.exports = router;
