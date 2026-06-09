const FailedJob = require('../models/failedJob.model');
const { getRequestQueue } = require('../queues/request.queue');
const { logger } = require('../config/logger');

const listFailedJobs = async () => FailedJob.find().sort({ failedAt: -1 });

const retryFailedJob = async (jobId) => {
  const failed = await FailedJob.findOne({ jobId });
  if (!failed) throw new Error('Failed job not found');
  const queue = getRequestQueue();
  if (!queue) throw new Error('Request queue unavailable');
  await queue.add(`retry-${failed.jobId}`, failed.payload, {
    priority: 1,
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: false,
    timeout: 120000,
  });
  await failed.deleteOne();
  logger.info('Retried dead-letter job', { jobId });
  return { jobId, status: 'requeued' };
};

const deleteFailedJob = async (jobId) => {
  const failed = await FailedJob.findOneAndDelete({ jobId });
  if (!failed) throw new Error('Failed job not found');
  logger.info('Deleted dead-letter job', { jobId });
  return { jobId, status: 'deleted' };
};

module.exports = { listFailedJobs, retryFailedJob, deleteFailedJob };
