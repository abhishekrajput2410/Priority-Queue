import api from './api';

export const fetchAiHealth = async () => {
  const { data } = await api.get('/ai/health');
  return data;
};

export const predictPriority = async (payload) => {
  const { data } = await api.post('/ai/predict', payload);
  return data;
};
