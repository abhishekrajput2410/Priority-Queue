const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateRequest } = require('../middleware/validation.middleware');
const {
  handleCreateRequest,
  handleGetRequests,
  handleGetRequestById,
  handleUpdateRequest,
  handleStats,
} = require('../controllers/request.controller');

const router = express.Router();

router.use(authMiddleware);
router.get(
  '/',
  handleGetRequests,
);
router.get(
  '/stats',
  authorize(['Admin']),
  handleStats,
);
router.get(
  '/:requestId',
  handleGetRequestById,
);
router.post(
  '/',
  [
    body('title').notEmpty(),
    body('category').notEmpty(),
    body('type').notEmpty(),
    body('payload').exists(),
    body('slaDeadline').isISO8601(),
  ],
  validateRequest,
  handleCreateRequest,
);
router.patch('/:requestId', handleUpdateRequest);

module.exports = router;
