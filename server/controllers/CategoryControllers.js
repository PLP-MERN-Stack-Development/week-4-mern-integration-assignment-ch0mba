const { default: mongoose } = require('mongoose');
const Category = require('../models/Category');

// @desc get all categories
// @route GET /api/categories
// @access Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc get a single category by ID
// @route GET /api/categories/:id
// @access Public

exports.getCategory = async (req, res) => {
    try{
        let category = await Category.findById(req.params.idOrSlug);
        if (mongoose.Types.ObjectId.isValid(req.params.idOrSlug)) {
            category = await Category.findById(req.params.idOrSlug);
        }else {
            category = await Category.findOne({ slug: req.params.idOrSlug });
        }
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }   
        res.status(200).json({ success: true, data: category });

    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc create a new category
// @route POST /api/categories
// @access Private (Admin only)

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });

    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, data: category });
       
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc delete a category
// @route DELETE /api/categories/:id   
// @access Private (Admin only)

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        // Optionally, you can also delete all posts associated with this category
        await category.remove();
         // Optionally, you can also delete all posts associated with this category 
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

