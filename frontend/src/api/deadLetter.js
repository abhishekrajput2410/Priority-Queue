import api from './api';

export const fetchFailedJobs = async () => {
  const { data } = await api.get('/dead-letter');
  return data;
};

export const retryFailedJob = async (jobId) => {
  const { data } = await api.post(`/dead-letter/${jobId}/retry`);
  return data;
};

export const deleteFailedJob = async (jobId) => {
  const { data } = await api.delete(`/dead-letter/${jobId}`);
  return data;
};
