const WorkerModel = require('../models/worker.model');
const Request = require('../models/request.model');
const { workerCount } = require('../config/metrics');

const registerWorker = async (workerId) => WorkerModel.findOneAndUpdate(
  { workerId },
  { workerId, status: 'idle', lastSeen: new Date() },
  { upsert: true, new: true },
);

const updateWorkerStatus = async (workerId, status, currentJobId = null) => {
  const worker = await WorkerModel.findOneAndUpdate(
    { workerId },
    { status, currentJobId, lastSeen: new Date() },
    { upsert: true, new: true },
  );
  const activeCount = await WorkerModel.countDocuments({ status: { $ne: 'down' } });
  workerCount.set(activeCount);
  return worker;
};

const getWorkers = async () => WorkerModel.find().sort({ lastSeen: -1 });

const markRequestProcessing = async (requestId, workerId) => Request.findOneAndUpdate(
  { requestId },
  { status: 'processing', assignedWorker: workerId, processedAt: new Date() },
  { new: true },
);

const completeRequest = async (requestId) => Request.findOneAndUpdate(
  { requestId },
  { status: 'completed' },
  { new: true },
);

module.exports = { registerWorker, updateWorkerStatus, getWorkers, markRequestProcessing, completeRequest };
