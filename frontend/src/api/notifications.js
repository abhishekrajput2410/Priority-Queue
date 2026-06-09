import api from './api';

export const fetchNotifications = async () => {
  const { data } = await api.get('/notifications');
  return data;
};

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await api.patch(`/notifications/${notificationId}`, { read: true });
  return data;
};
