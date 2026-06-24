const { Queue } = require('bullmq');
const { logger } = require('../config/logger');
const { isRedisAvailable, getQueueConnection } = require('../config/redis');
const { priorityScores } = require('../utils/priority.util');

let requestQueue;

const initQueue = () => {
  if (!isRedisAvailable()) {
    logger.warn('Skipping request queue initialization because Redis is unavailable');
    return;
  }

  requestQueue = new Queue('requestQueue', { connection: getQueueConnection() });
  requestQueue.on('added', (jobId) => logger.info(`Job added to requestQueue: ${jobId}`));
};

const getRequestQueue = () => requestQueue;

const enqueueRequest = async (request) => {
  if (!requestQueue) {
    throw new Error('Request queue is not available because Redis is unavailable');
  }

  return requestQueue.add(request.requestId, request, {
    priority: priorityScores[request.priority] || priorityScores.UNKNOWN,
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
    timeout: 120000,
  });
};

module.exports = { initQueue, getRequestQueue, enqueueRequest };
