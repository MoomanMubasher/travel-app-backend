const jwt = require('jsonwebtoken');
const secretKey = "abc123"

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    const tokenWithoutBearer = token.substring(7);
    if (!tokenWithoutBearer) {
        return res.status(401).send('Access denied. Token is required');
    }
    try {
        const decoded = jwt.verify(tokenWithoutBearer, secretKey);
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