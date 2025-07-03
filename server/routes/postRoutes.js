const express = require('express');
const router = express.Router();

// Controllers
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/PostControllers');

// Middleware
const { protect, isAdmin } = require('../middleware/authMiddleware');

// POST Routes
router.route('/')
  .get(getPosts) // Anyone can view all posts
  .post(protect, isAdmin, createPost); // Only admins can create posts

router.route('/:id')
  .get(getPost) // Anyone can view a single post
  .put(protect, isAdmin, updatePost) // Only admins can edit
  .delete(protect, isAdmin, deletePost); // Only admins can delete

module.exports = router;