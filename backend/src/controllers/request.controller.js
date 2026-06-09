const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  countRequests,
} = require('../services/request.service');
const { createNotification } = require('../services/notification.service');
const { created, ok, notFound, badRequest } = require('../utils/response.util');

const handleCreateRequest = async (req, res) => {
  try {
    const request = await createRequest({ ...req.body, createdBy: req.user._id });
    await createNotification({
      title: 'Request queued',
      message: `Request ${request.requestId} is now queued for processing.`,
      type: 'success',
      requestId: request.requestId,
      userId: req.user._id,
    });
    return created(res, request);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleGetRequests = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;
  const filter = {};

  // Users only see their own requests, Admins see all
  if (req.user.role === 'User') {
    filter.createdBy = req.user._id;
  }

  if (req.query.status) filter.status = req.query.status;
  if (req.query.priority) filter.priority = req.query.priority;
  const requests = await getRequests(filter, { skip, limit });
  return ok(res, { requests, page, limit });
};

const handleGetRequestById = async (req, res) => {
  const request = await getRequestById(req.params.requestId);
  if (!request) return notFound(res, 'Request not found');

  // Users can only see their own requests
  if (req.user.role === 'User' && request.createdBy.toString() !== req.user._id.toString()) {
    return notFound(res, 'Request not found');
  }

  return ok(res, request);
};

const handleUpdateRequest = async (req, res) => {
  const request = await getRequestById(req.params.requestId);
  if (!request) return notFound(res, 'Request not found');

  // Users can only update their own requests
  if (req.user.role === 'User' && request.createdBy.toString() !== req.user._id.toString()) {
    return notFound(res, 'Request not found');
  }

  const updates = req.body;
  const updatedRequest = await updateRequest(req.params.requestId, updates);
  if (!updatedRequest) return notFound(res, 'Request not found');
  return ok(res, updatedRequest);
};

const handleStats = async (req, res) => {
  const stats = await countRequests();
  return ok(res, stats);
};

module.exports = { handleCreateRequest, handleGetRequests, handleGetRequestById, handleUpdateRequest, handleStats };
