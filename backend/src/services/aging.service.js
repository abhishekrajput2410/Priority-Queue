const Request = require('../models/request.model');
const { escalatePriorityByWait, scoreToPriority } = require('../utils/priority.util');
const { createNotification } = require('./notification.service');
const { logger } = require('../config/logger');

const ageRequests = async () => {
  const queuedRequests = await Request.find({ status: 'queued' });
  const now = Date.now();

  const jobs = queuedRequests.map(async (request) => {
    const waitTime = Math.max(0, now - request.createdAt.getTime());
    const newScore = escalatePriorityByWait(request.priorityScore, Math.floor(waitTime / 1000));
    if (newScore < request.priorityScore) {
      request.priorityScore = newScore;
      request.priority = scoreToPriority(request.priorityScore);
      await request.save();
      await createNotification({
        title: 'Aging escalation',
        message: `Request ${request.requestId} has aged and priority escalated to ${request.priority}.`,
        type: 'info',
        requestId: request.requestId,
      });
      logger.info('Aging escalation applied', { requestId: request.requestId, newPriority: request.priority });
    }
  });

  return Promise.all(jobs);
};

module.exports = { ageRequests };
