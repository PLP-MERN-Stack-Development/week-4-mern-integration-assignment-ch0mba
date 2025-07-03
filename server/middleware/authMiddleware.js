const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = (req, res, next) => {
    let token;

    // Check if token is provided in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Attach user ID to request object
        next();
    }catch (err) {
        return res.status(401).json({ success: false, message: 'invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if ( req.user.role !== 'admin') {

    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
}
next();
};