const jwt = require('jsonwebtoken');
const User = require('../models/User');

//@desc Register a new user
//@route POST /api/auth/register
//@access Public
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await user.create ({ name, email, password });
        sendTokenResponse(user, 201, res);
    }catch (err) {
        res.status(400).json({ success: false, message: 'Server error' });
    }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
    const { eamil, password } = req.body;

    //validate email and password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    } 

    //check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    //check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    sendTokenResponse(user, 200, res);
};

//Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
    //create token
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }
    });
};