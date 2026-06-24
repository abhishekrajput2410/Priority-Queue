const os = require('os');
const { createProcessingWorker } = require('./processor');
const { logger } = require('../config/logger');
const { registerWorker } = require('../services/worker.service');
const { isRedisAvailable } = require('../config/redis');

const createWorkerCluster = async () => {
  if (!isRedisAvailable()) {
    logger.warn('Skipping worker cluster startup because Redis is unavailable');
    return;
  }

  const workerCount = Math.min(4, os.cpus().length || 2);
  await Promise.all(
    Array.from({ length: workerCount }, async (_, index) => {
      const workerId = `worker-${index + 1}`;
      await registerWorker(workerId);
      const worker = createProcessingWorker(workerId);
      if (worker) {
        logger.info('Worker instance started', { workerId });
      }
    }),
  );
};

module.exports = { createWorkerCluster };
