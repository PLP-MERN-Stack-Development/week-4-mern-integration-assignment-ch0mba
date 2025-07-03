const express = require('express');
const router = express.Router();

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/CategoryControllers');

const { protect, isAdmin } = require('../middleware/authMiddleware');

// public routes
router.route('/')
    .get(getCategories) // Get all categories
    .post(protect, isAdmin, createCategory); // Create a new category (admin only)

// private routes
router.route('/:idOrSlug')
    .get(getCategory) // Get a single category by ID or slug
    .put(protect, isAdmin, updateCategory) // Update a category (admin only)
    .delete(protect, isAdmin, deleteCategory); // Delete a category (admin only)

module.exports = router;


