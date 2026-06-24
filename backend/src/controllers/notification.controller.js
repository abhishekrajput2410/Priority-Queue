const { getNotifications, markNotificationRead } = require('../services/notification.service');
const { ok, badRequest } = require('../utils/response.util');

const handleGetNotifications = async (req, res) => {
  const notifications = await getNotifications(req.user._id);
  return ok(res, notifications);
};

const handleMarkNotificationRead = async (req, res) => {
  try {
    const notification = await markNotificationRead(req.params.notificationId, req.user._id);
    return ok(res, notification);
  } catch (error) {
    return badRequest(res, error.message);
  }
};

module.exports = { handleGetNotifications, handleMarkNotificationRead };
