const { predictPriority, healthCheck } = require('../services/ai.service');
const { ok, badRequest } = require('../utils/response.util');

const handleAIHealth = async (req, res) => {
  try {
    const status = await healthCheck();
    return ok(res, status);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handlePredict = async (req, res) => {
  try {
    const prediction = await predictPriority(req.body);
    return ok(res, prediction);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = { handleAIHealth, handlePredict };
