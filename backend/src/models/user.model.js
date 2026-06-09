const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'User', enum: ['Admin', 'User'] },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  refreshToken: { type: String },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
