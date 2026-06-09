const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  workerId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['idle', 'busy', 'down'], default: 'idle' },
  jobsProcessed: { type: Number, default: 0 },
  lastSeen: { type: Date, default: Date.now },
  currentJobId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
