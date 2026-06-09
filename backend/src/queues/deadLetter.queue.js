const { Queue } = require('bullmq');
const { getRedis } = require('../config/redis');

let deadLetterQueue;

const initDeadLetterQueue = () => {
  const redis = getRedis();
  if (!redis) {
    return;
  }

  deadLetterQueue = new Queue('deadLetterQueue', {
    connection: redis,
  });
};

const getDeadLetterQueue = () => deadLetterQueue;

module.exports = { initDeadLetterQueue, getDeadLetterQueue };
