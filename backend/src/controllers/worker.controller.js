const { getWorkers } = require('../services/worker.service');
const { ok } = require('../utils/response.util');

const handleGetWorkers = async (req, res) => {
  const workers = await getWorkers();
  return ok(res, workers);
};

module.exports = { handleGetWorkers };
