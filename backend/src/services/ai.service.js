const axios = require('axios');

const predictPriority = async ({ type, payloadSize, waitTime, queueSize, sla }) => {
  const response = await axios.post(`${process.env.AI_SERVICE_URL}/predict`, {
    type,
    payloadSize,
    waitTime,
    queueSize,
    sla,
  }, { timeout: 10000 });
  return response.data;
};

const healthCheck = async () => {
  const response = await axios.get(`${process.env.AI_SERVICE_URL}/health`, { timeout: 5000 });
  return response.data;
};

module.exports = { predictPriority, healthCheck };
