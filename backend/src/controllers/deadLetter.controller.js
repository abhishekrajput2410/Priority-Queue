const { listFailedJobs, retryFailedJob, deleteFailedJob } = require('../services/deadLetter.service');
const { ok, badRequest } = require('../utils/response.util');

const handleListFailedJobs = async (req, res) => {
  try {
    const items = await listFailedJobs();
    return ok(res, items);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleRetryFailedJob = async (req, res) => {
  try {
    const item = await retryFailedJob(req.params.jobId);
    return ok(res, item);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleDeleteFailedJob = async (req, res) => {
  try {
    const item = await deleteFailedJob(req.params.jobId);
    return ok(res, item);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = { handleListFailedJobs, handleRetryFailedJob, handleDeleteFailedJob };
