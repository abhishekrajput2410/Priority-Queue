const { logger } = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  logger.error('Unhandled error', err);
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || 'Server error',
    details: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = { errorHandler };
