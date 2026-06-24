const Redis = require('ioredis');
const { logger } = require('./logger');

let redisAvailable = false;

const getQueueConnection = () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number.parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
});

const initRedis = async () => {
  const client = new Redis(getQueueConnection());

  try {
    await client.ping();
    redisAvailable = true;
    logger.info('Redis connected');
    await client.quit();
    return true;
  } catch (err) {
    logger.error('Redis connection failed', err);
    redisAvailable = false;
    return null;
  }
};

const isRedisAvailable = () => redisAvailable;

module.exports = { initRedis, isRedisAvailable, getQueueConnection };
