const Request = require('../models/request.model');
const { escalatedSlaPriority, scoreToPriority } = require('../utils/priority.util');
const { createNotification } = require('./notification.service');
const { logger } = require('../config/logger');

const checkSlaBreaches = async () => {
  const staleRequests = await Request.find({ status: 'queued', slaDeadline: { $lt: new Date() } });
  if (!staleRequests.length) return [];

  const updates = staleRequests.map(async (request) => {
    request.priorityScore = escalatedSlaPriority(request.slaDeadline);
    request.priority = scoreToPriority(request.priorityScore);
    await request.save();
    await createNotification({
      title: 'SLA breach detected',
      message: `Request ${request.requestId} has breached its SLA and priority escalated.`,
      type: 'warning',
      requestId: request.requestId,
    });
    logger.warn('SLA breach escalated', { requestId: request.requestId });
  });

  return Promise.all(updates);
};

module.exports = { checkSlaBreaches };
