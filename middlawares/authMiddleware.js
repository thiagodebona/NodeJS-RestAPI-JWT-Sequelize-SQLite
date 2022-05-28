const jwt = require('jsonwebtoken');
const resultService = require('../utils/defaultResultService');

const authMiddleware = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        resultService.createErrorResult(res, null, "Access Denied", null, 401);
    try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        if (user) req.user = user;
        next();
    } catch (e) {
        resultService.createErrorResult(res, null, "Invalid credentials", e, 401)
    }
}

module.exports = authMiddleware;