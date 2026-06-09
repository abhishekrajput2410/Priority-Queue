const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const xss = require('xss-clean');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger');
const { connectDatabase } = require('./config/db');
const { initRedis } = require('./config/redis');
const { initQueue } = require('./queues/request.queue');
const { initDeadLetterQueue } = require('./queues/deadLetter.queue');
const { logger } = require('./config/logger');
const { seedAdminUser } = require('./utils/seed');
const authRoutes = require('./routes/auth.routes');
const requestRoutes = require('./routes/request.routes');
const workerRoutes = require('./routes/worker.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const aiRoutes = require('./routes/ai.routes');
const deadLetterRoutes = require('./routes/deadLetter.routes');
const metricsRoutes = require('./routes/metrics.routes');
const notificationRoutes = require('./routes/notification.routes');
const docsRoutes = require('./routes/docs.routes');
const { errorHandler } = require('./middleware/error.middleware');
const { logRequests } = require('./middleware/logger.middleware');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// app.use(xss());
app.use(morgan('combined'));
app.use(logRequests);

const rateLimitWindowMinutes = Number.parseInt(process.env.RATE_LIMIT_WINDOW, 10);
const rateLimitMax = Number.parseInt(process.env.RATE_LIMIT_MAX, 10);

app.use(
  rateLimit({
    windowMs: Number.isFinite(rateLimitWindowMinutes)
      ? rateLimitWindowMinutes * 60 * 1000
      : 15 * 60 * 1000,
    max: Number.isFinite(rateLimitMax) ? rateLimitMax : 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

const initializeServices = async () => {
  await connectDatabase();
  await seedAdminUser();
  const redisClient = await initRedis();

  if (redisClient) {
    initQueue();
    initDeadLetterQueue();
  } else {
    logger.warn('Redis unavailable; queue services will remain disabled until Redis is available');
  }
};

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/dead-letter', deadLetterRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

app.use(errorHandler);

module.exports = app;
module.exports.app = app;
module.exports.initializeServices = initializeServices;
module.exports.default = app;
