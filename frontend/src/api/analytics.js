import api from './api';

export const fetchAnalytics = async () => {
  const { data } = await api.get('/analytics');
  return data;
};
