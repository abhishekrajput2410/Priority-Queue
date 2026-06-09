const jwt = require('jsonwebtoken');

const signToken = (payload, expiresIn) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const authenticateToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { signToken, authenticateToken };
