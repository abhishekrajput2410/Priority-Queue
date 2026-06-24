const Request = require('../models/request.model');
const { ok } = require('../utils/response.util');

const handleAnalytics = async (req, res) => {
  const scope = req.user.role === 'User' ? { createdBy: req.user._id } : {};
  const total = await Request.countDocuments(scope);
  const completed = await Request.countDocuments({ ...scope, status: 'completed' });
  const failed = await Request.countDocuments({ ...scope, status: 'failed' });
  const distribution = await Request.aggregate([
    { $match: scope },
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);
  const slaViolations = await Request.countDocuments({
    ...scope,
    slaDeadline: { $lt: new Date() },
    status: 'queued',
  });
  const averageProcessing = await Request.aggregate([
    { $match: { ...scope, processedAt: { $exists: true } } },
    { $project: { duration: { $subtract: ['$processedAt', '$createdAt'] } } },
    { $group: { _id: null, average: { $avg: '$duration' } } },
  ]);

  return ok(res, {
    total,
    completed,
    failed,
    distribution,
    slaViolations,
    averageProcessing: averageProcessing[0]?.average || 0,
  });
};

module.exports = { handleAnalytics };
