const { Queue, Worker, JobScheduler } = require('bullmq');
const { logger } = require('../config/logger');
const { getRedis } = require('../config/redis');
const { priorityScores } = require('../utils/priority.util');
const FailedJob = require('../models/failedJob.model');

let requestQueue;
let requestWorker;

const getQueueConnection = () => ({
  connection: getRedis(),
});

const initQueue = () => {
  const redis = getRedis();
  if (!redis) {
    logger.warn('Skipping request queue initialization because Redis is unavailable');
    return;
  }

  const scheduler = new JobScheduler('requestQueue', getQueueConnection());
  scheduler.on('failed', (job, err) => logger.error('Queue scheduler failed', err));
  requestQueue = new Queue('requestQueue', getQueueConnection());
  requestQueue.on('added', (jobId) => logger.info(`Job added to requestQueue: ${jobId}`));

  requestWorker = new Worker(
    'requestQueue',
    async (job) => {
      logger.info('Worker claimed job', { jobId: job.id, name: job.name });
      return job.data;
    },
    {
      connection: redis,
      concurrency: 10,
      autorun: false,
    },
  );

  requestWorker.on('failed', async (job, err) => {
    logger.error('Job failed', { jobId: job.id, error: err.message });
    await FailedJob.create({
      jobId: job.id,
      requestId: job.data.requestId,
      error: err.message,
      attemptsMade: job.attemptsMade,
      payload: job.data,
    });
  });
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
