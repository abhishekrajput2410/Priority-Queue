const { Worker } = require('bullmq');
const { getRedis } = require('../config/redis');
const Request = require('../models/request.model');
const FailedJob = require('../models/failedJob.model');
const { updateWorkerStatus, markRequestProcessing, completeRequest } = require('../services/worker.service');
const { createNotification } = require('../services/notification.service');
const { requestsCompleted, requestsFailed, avgProcessingTime } = require('../config/metrics');
const { logger } = require('../config/logger');
const { pushEvent } = require('../sockets/socket');

const createProcessingWorker = (workerId) => {
  const redis = getRedis();
  if (!redis) {
    logger.warn(`Skipping processing worker ${workerId} because Redis is unavailable`);
    return null;
  }

  const worker = new Worker('requestQueue', async (job) => {
    await updateWorkerStatus(workerId, 'busy', job.id);
    await markRequestProcessing(job.data.requestId, workerId);
    pushEvent('job:start', { jobId: job.id, requestId: job.data.requestId, workerId });
    await new Promise((resolve) => {
      setTimeout(resolve, 2000 + Math.random() * 3000);
    });
    await completeRequest(job.data.requestId);
    await updateWorkerStatus(workerId, 'idle', null);
    pushEvent('job:complete', { jobId: job.id, requestId: job.data.requestId, workerId });
    requestsCompleted.inc();
    const duration = Date.now() - new Date(job.timestamp).getTime();
    avgProcessingTime.set(duration);
    await createNotification({
      title: 'Request completed',
      message: `Request ${job.data.requestId} completed by worker ${workerId}`,
      type: 'success',
      requestId: job.data.requestId,
    });
    return { completedAt: new Date() };
  }, {
    connection: redis,
    concurrency: 10,
  });

  worker.on('failed', async (job, err) => {
    await updateWorkerStatus(workerId, 'idle', null);
    await Request.findOneAndUpdate({ requestId: job.data.requestId }, { status: 'failed' });
    await FailedJob.create({
      jobId: job.id,
      requestId: job.data.requestId,
      error: err.message,
      attemptsMade: job.attemptsMade,
      payload: job.data,
    });
    requestsFailed.inc();
    pushEvent('job:failed', { jobId: job.id, error: err.message, workerId });
    logger.error('Worker job failed', { workerId, jobId: job.id, error: err.message });
  });

  return worker;
};

module.exports = { createProcessingWorker };
