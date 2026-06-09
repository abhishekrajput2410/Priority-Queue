const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { handleGetNotifications } = require('../controllers/notification.controller');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();
router.use(authMiddleware);
router.get('/', authorize(['Admin', 'User']), handleGetNotifications);
module.exports = router;
