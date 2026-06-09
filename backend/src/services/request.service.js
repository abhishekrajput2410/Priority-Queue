const { v4: uuidv4 } = require('uuid');
const Request = require('../models/request.model');
const { enqueueRequest } = require('../queues/request.queue');
const { requestsTotal, queueSize } = require('../config/metrics');
const { normalizePriority, scoreToPriority } = require('../utils/priority.util');
const { createAuditEntry } = require('./audit.service');

const createRequest = async ({ title, description, category, type, payload, priority, slaDeadline, createdBy }) => {
  const requestId = uuidv4();
  const score = normalizePriority(priority);
  const request = await Request.create({
    requestId,
    title,
    description,
    category,
    type,
    payload,
    priority: scoreToPriority(score),
    priorityScore: score,
    slaDeadline,
    createdBy,
  });

  await enqueueRequest({
    ...request.toObject(),
    requestId,
  });
  await createAuditEntry({
    user: createdBy,
    action: 'create_request',
    resource: 'Request',
    metadata: {
      requestId,
      priority,
    },
  });
  requestsTotal.inc();
  const count = await Request.countDocuments({ status: 'queued' });
  queueSize.set(count);
  return request;
};

const updateRequest = async (requestId, updates) => Request.findOneAndUpdate(
  { requestId },
  updates,
  { new: true },
);

const getRequests = async (filter = {}, options = {}) => Request.find(filter)
  .sort({ createdAt: -1 })
  .skip(options.skip || 0)
  .limit(options.limit || 50);

const getRequestById = async (requestId) => Request.findOne({ requestId });

const countRequests = async () => ({
  total: await Request.countDocuments(),
  active: await Request.countDocuments({ status: 'processing' }),
  completed: await Request.countDocuments({ status: 'completed' }),
  failed: await Request.countDocuments({ status: 'failed' }),
});

module.exports = { createRequest, updateRequest, getRequests, getRequestById, countRequests };
