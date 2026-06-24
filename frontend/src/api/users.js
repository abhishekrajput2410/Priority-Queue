import api from './api';

export const fetchUsers = async () => {
  const { data } = await api.get('/auth/users');
  return data;
};

export const createUser = async (payload) => {
  const { data } = await api.post('/auth/users', payload);
  return data;
};
