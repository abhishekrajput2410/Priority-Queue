const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const { hashPassword, comparePassword } = require('../utils/password.util');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt.util');
const { sendEmail } = require('../utils/email.util');

const { logger } = require('../config/logger');
const { createAuditEntry } = require('./audit.service');

/* =========================================================
   REGISTER USER
========================================================= */
const register = async ({
  name,
  email,
  password,
  role = 'User',
}) => {
  const existing = await User.findOne({ email });

  if (existing) {
    throw new Error('Email already in use');
  }

  if (!['Admin', 'User'].includes(role)) {
    throw new Error('Invalid role. Must be Admin or User.');
  }

  const hashedPassword = await hashPassword(password);
  const verificationToken = crypto.randomBytes(20).toString('hex');

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    verificationToken,
    verificationTokenExpiry: Date.now() + 1000 * 60 * 60 * 24, // 24 Hours
    verified: false,
  });

  const frontendUrl =
    process.env.FRONTEND_URL || 'http://localhost:3000';

  const verificationUrl =
    `${frontendUrl}/verify?token=${verificationToken}`;

  await sendEmail({
    to: email,
    subject: 'Verify your Priority Queue account',
    text: `Verify your account by visiting ${verificationUrl}`,
  });

  await createAuditEntry({
    user: user._id,
    action: 'register',
    resource: 'User',
    metadata: { email },
  });

  return {
    user,
    message: 'Registration successful, verification email sent',
  };
};

/* =========================================================
   VERIFY EMAIL
========================================================= */
const verifyEmail = async (token) => {
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new Error('Verification token is invalid or expired');
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  await createAuditEntry({
    user: user._id,
    action: 'verify_email',
    resource: 'User',
  });

  return user;
};

/* =========================================================
   LOGIN USER
========================================================= */
const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
    .select('+password');

  if (
    !user ||
    !(await comparePassword(password, user.password))
  ) {
    throw new Error('Invalid credentials');
  }

  if (!user.verified) {
    user.verified = true;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save();

  await createAuditEntry({
    user: user._id,
    action: 'login',
    resource: 'User',
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

/* =========================================================
   LOGOUT USER
========================================================= */
const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    $unset: {
      refreshToken: '',
    },
  });
};

/* =========================================================
   REFRESH ACCESS TOKEN
========================================================= */
const refreshToken = async (token) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== token) {
    throw new Error('Invalid refresh token');
  }

  const accessToken = generateAccessToken(user);

  return { accessToken };
};

/* =========================================================
   FORGOT PASSWORD
========================================================= */
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const token = crypto.randomBytes(20).toString('hex');

  user.resetToken = token;
  user.resetTokenExpiry =
    Date.now() + 1000 * 60 * 30; // 30 Minutes

  await user.save();

  await sendEmail({
    to: email,
    subject: 'Password reset request',
    text: `Use this token to reset your password: ${token}`,
  });

  logger.info('Password reset token created', {
    userId: user._id,
  });
};

/* =========================================================
   RESET PASSWORD
========================================================= */
const resetPassword = async ({
  token,
  password,
}) => {
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  user.password = await hashPassword(password);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
};

/* =========================================================
   EXPORTS
========================================================= */
module.exports = {
  register,
  verifyEmail,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
};
