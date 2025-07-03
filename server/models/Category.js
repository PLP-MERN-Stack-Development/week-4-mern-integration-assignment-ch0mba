const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxlength: [50, 'Category name must be less than 50 characters']
    },
    slug: {
        type: String,
        required: [true, 'Category slug is required'],
        trim: true,
        unique: true
    },


}, { timestamps: true });

//create a slug from name before saving
CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) return next();{
        this.slug = this.name
        .toLowerCase()
        .replace(/ +/g, '-')
        .replace(/[^\w-]+/g, '');
    }
    next();
});

module.exports = mongoose.model('Category', CategorySchema);
// This code defines a Mongoose schema for a Category model, which includes fields for name and slug. The name field is required, unique, and has a maximum length of 50 characters. The slug is generated from the name before saving, ensuring it is lowercase, spaces are replaced with hyphens, and non-word characters are removed. The schema also includes timestamps for creation and updates. Finally, the model is exported for use in other parts of the application.