const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const {
  handleListFailedJobs,
  handleRetryFailedJob,
  handleDeleteFailedJob,
} = require('../controllers/deadLetter.controller');

const router = express.Router();
router.use(authMiddleware);
router.get(
  '/',
  authorize(['Admin']),
  handleListFailedJobs,
);
router.post(
  '/:jobId/retry',
  authorize(['Admin']),
  handleRetryFailedJob,
);
router.delete(
  '/:jobId',
  authorize(['Admin']),
  handleDeleteFailedJob,
);
module.exports = router;
