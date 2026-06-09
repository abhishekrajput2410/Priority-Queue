const Request = require('../models/request.model');
const { ok } = require('../utils/response.util');

const handleAnalytics = async (req, res) => {
  const total = await Request.countDocuments();
  const completed = await Request.countDocuments({ status: 'completed' });
  const failed = await Request.countDocuments({ status: 'failed' });
  const distribution = await Request.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);
  const slaViolations = await Request.countDocuments({ slaDeadline: { $lt: new Date() }, status: 'queued' });
  const averageProcessing = await Request.aggregate([
    { $match: { processedAt: { $exists: true } } },
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
