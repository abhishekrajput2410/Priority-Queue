const {
  register,
  verifyEmail,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  listUsers,
  createUserByAdmin,
} = require('../services/auth.service');
const { created, ok, badRequest } = require('../utils/response.util');

const handleRegister = async (req, res) => {
  try {
    const result = await register(req.body);
    return created(res, result);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleLogin = async (req, res) => {
  try {
    const result = await login(req.body);
    return ok(res, result);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleLogout = async (req, res) => {
  await logout(req.user._id);
  return ok(res, { message: 'Logged out' });
};

const handleRefresh = async (req, res) => {
  try {
    const result = await refreshToken(req.body.refreshToken);
    return ok(res, result);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    await forgotPassword(req.body.email);
    return ok(res, { message: 'Password reset instructions sent' });
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleResetPassword = async (req, res) => {
  try {
    await resetPassword(req.body);
    return ok(res, { message: 'Password has been reset' });
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleVerifyEmail = async (req, res) => {
  try {
    await verifyEmail(req.query.token);
    return ok(res, { message: 'Email verified successfully' });
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleListUsers = async (req, res) => {
  try {
    const users = await listUsers();
    return ok(res, users);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const user = await createUserByAdmin(req.body);
    return created(res, user);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefresh,
  handleForgotPassword,
  handleResetPassword,
  handleVerifyEmail,
  handleListUsers,
  handleCreateUser,
};
