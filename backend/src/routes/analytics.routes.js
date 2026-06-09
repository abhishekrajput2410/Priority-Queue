const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { handleAnalytics } = require('../controllers/analytics.controller');

const router = express.Router();
router.use(authMiddleware);
router.get('/', authorize(['Admin']), handleAnalytics);
module.exports = router;
