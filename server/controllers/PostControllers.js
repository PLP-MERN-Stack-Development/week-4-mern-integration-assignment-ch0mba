// server/controllers/PostControllers.js

const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name slug')
      .populate('author', 'name username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get single post by ID or slug
// @route   GET /api/posts/:idOrSlug
// @access  Public
exports.getPost = async (req, res) => {
  try {
    let post;

    if (mongoose.Types.ObjectId.isValid(req.params.idOrSlug)) {
      post = await Post.findById(req.params.idOrSlug)
        .populate('category', 'name slug')
        .populate('author', 'name username');
    } else {
      post = await Post.findOne({ slug: req.params.idOrSlug })
        .populate('category', 'name slug')
        .populate('author', 'name username');
    }

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Optional: Increment view count
    post.viewCount += 1;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Admin
exports.createPost = async (req, res) => {
  try {
    // Set author from authenticated user
    req.body.author = req.user.id;

    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update an existing post
// @route   PUT /api/posts/:id
// @access  Private/Admin
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};