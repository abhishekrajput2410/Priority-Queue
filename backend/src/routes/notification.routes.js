const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { handleGetNotifications, handleMarkNotificationRead } = require('../controllers/notification.controller');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();
router.use(authMiddleware);
router.get('/', authorize(['Admin', 'User']), handleGetNotifications);
router.patch('/:notificationId', authorize(['Admin', 'User']), handleMarkNotificationRead);
module.exports = router;
