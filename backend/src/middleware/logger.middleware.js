const { logger } = require('../config/logger');

const logRequests = (req, res, next) => {
  const { method, originalUrl, body, query, params } = req;
  logger.debug('Request received', { method, originalUrl, body, query, params });
  return next();
};

module.exports = { logRequests };
