const express = require('express');
const { body } = require('express-validator');
const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefresh,
  handleForgotPassword,
  handleResetPassword,
  handleVerifyEmail,
  handleListUsers,
  handleCreateUser,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateRequest } = require('../middleware/validation.middleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('role').optional().isIn(['Admin', 'User']),
  ],
  validateRequest,
  handleRegister,
);
router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  handleLogin,
);
router.post('/logout', authMiddleware, handleLogout);
router.post(
  '/refresh',
  [body('refreshToken').notEmpty()],
  validateRequest,
  handleRefresh,
);
router.post(
  '/forgot-password',
  [body('email').isEmail()],
  validateRequest,
  handleForgotPassword,
);
router.post(
  '/reset-password',
  [body('token').notEmpty(), body('password').isLength({ min: 8 })],
  validateRequest,
  handleResetPassword,
);
router.get('/verify', handleVerifyEmail);
router.get('/users', authMiddleware, authorize(['Admin']), handleListUsers);
router.post(
  '/users',
  authMiddleware,
  authorize(['Admin']),
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('role').optional().isIn(['Admin', 'User']),
  ],
  validateRequest,
  handleCreateUser,
);

module.exports = router;
