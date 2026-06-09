const { client } = require('../config/metrics');

const handleMetrics = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};

module.exports = { handleMetrics };
