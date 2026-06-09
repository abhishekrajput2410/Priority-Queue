const mongoose = require('mongoose');

const failedJobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true },
  requestId: { type: String, required: true },
  error: { type: String, required: true },
  attemptsMade: { type: Number, default: 0 },
  failedAt: { type: Date, default: Date.now },
  payload: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('FailedJob', failedJobSchema);
