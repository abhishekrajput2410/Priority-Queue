const client = require('prom-client');

const { collectDefaultMetrics } = client;
collectDefaultMetrics({ prefix: 'priorityqueue_' });

const requestsTotal = new client.Counter({
  name: 'requests_total',
  help: 'Total requests received',
});

const requestsCompleted = new client.Counter({
  name: 'requests_completed',
  help: 'Total completed requests',
});

const requestsFailed = new client.Counter({
  name: 'requests_failed',
  help: 'Total failed requests',
});

const avgProcessingTime = new client.Gauge({
  name: 'avg_processing_time',
  help: 'Average request processing time in milliseconds',
});

const queueSize = new client.Gauge({
  name: 'queue_size',
  help: 'Current queue length',
});

const workerCount = new client.Gauge({
  name: 'worker_count',
  help: 'Active worker count',
});

module.exports = {
  client,
  requestsTotal,
  requestsCompleted,
  requestsFailed,
  avgProcessingTime,
  queueSize,
  workerCount,
};
