const { getNotifications } = require('../services/notification.service');
const { ok } = require('../utils/response.util');

const handleGetNotifications = async (req, res) => {
  const notifications = await getNotifications(req.user._id);
  return ok(res, notifications);
};

module.exports = { handleGetNotifications };
