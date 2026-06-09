const Notification = require('../models/notification.model');
const { logger } = require('../config/logger');

const createNotification = async ({ title, message, type = 'info', requestId, userId }) => {
  const notification = await Notification.create({ title, message, type, requestId, userId });
  logger.info('Notification generated', { title, requestId, userId });
  return notification;
};

const getNotifications = async (userId) => Notification.find({ userId }).sort({ createdAt: -1 });

module.exports = { createNotification, getNotifications };
