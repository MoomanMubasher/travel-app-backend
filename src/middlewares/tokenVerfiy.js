const jwt = require('jsonwebtoken');
const secretKey = "abc123"

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. Token is required');
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Invalid token');
    }
};

module.exports = {
    verifyToken
}