const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'supersecretjwtkey';

const generateAccessToken = (user) => jwt.sign(
  { id: user._id, role: user.role },
  jwtSecret,
  { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
);

const generateRefreshToken = (user) => jwt.sign(
  { id: user._id },
  jwtSecret,
  { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' },
);

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
