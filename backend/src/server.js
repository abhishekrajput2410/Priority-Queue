require('dotenv').config();
const http = require('http');
const { app, initializeServices } = require('./app');
const { initSocket } = require('./sockets/socket');
const { createWorkerCluster } = require('./workers/monitor');
const { agingCron } = require('./cron/agingCron');
const { slaCron } = require('./cron/slaCron');
const { logger } = require('./config/logger');

const PORT = parseInt(process.env.PORT, 10) || 5000;
const server = http.createServer(app);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use. Ensure no other backend instance is running or change PORT.`);
    process.exit(1);
  }

  throw err;
});

initializeServices().then(() => {
  initSocket(server);
  server.listen(PORT, () => {
    logger.info(`Backend is running on port ${PORT}`);
    createWorkerCluster();
    agingCron();
    slaCron();
  });
}).catch(() => {
  logger.error('Backend startup aborted due to service initialization failure');
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('Graceful shutdown signal received');
  server.close(() => process.exit(0));
});
