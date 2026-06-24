const express = require('express');
const { body } = require('express-validator');
const { handleAIHealth, handlePredict } = require('../controllers/ai.controller');
const { validateRequest } = require('../middleware/validation.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();
router.use(authMiddleware);
router.get('/health', authorize(['Admin']), handleAIHealth);
router.post(
  '/predict',
  [
    body('type').notEmpty(),
    body('payloadSize').isFloat({ min: 0 }),
    body('waitTime').isFloat({ min: 0 }),
    body('queueSize').isFloat({ min: 0 }),
    body('sla').isISO8601(),
  ],
  validateRequest,
  authorize(['Admin']),
  handlePredict,
);
module.exports = router;
