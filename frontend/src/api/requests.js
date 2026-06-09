import api from './api';

export const fetchRequests = async ({ queryKey }) => {
  const [, { page = 1, limit = 20, status, priority }] = queryKey;
  const params = { page, limit };
  if (status) params.status = status;
  if (priority) params.priority = priority;
  const { data } = await api.get('/requests', { params });
  return data;
};

export const createRequest = async (payload) => {
  const { data } = await api.post('/requests', payload);
  return data;
};
