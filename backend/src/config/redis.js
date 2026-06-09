const { createClient } = require('redis');
const { logger } = require('./logger');

let redisClient;

const initRedis = async () => {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number.parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
    password: process.env.REDIS_PASSWORD || undefined,
  });

  client.on('error', (err) => logger.error('Redis client error', err));
  client.on('connect', () => logger.info('Redis client connected'));
  client.on('ready', () => logger.info('Redis client ready'));

  try {
    await client.connect();
    redisClient = client;
    return client;
  } catch (err) {
    logger.error('Redis connection failed', err);
    redisClient = undefined;
    client.removeAllListeners('ready');
    client.removeAllListeners('error');
    return null;
  }
};

const getRedis = () => redisClient;

module.exports = { initRedis, getRedis };
