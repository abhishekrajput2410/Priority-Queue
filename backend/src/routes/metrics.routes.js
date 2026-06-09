const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { handleMetrics } = require('../controllers/metrics.controller');

const router = express.Router();
router.use(authMiddleware);
router.get('/', authorize(['Admin']), handleMetrics);
module.exports = router;
