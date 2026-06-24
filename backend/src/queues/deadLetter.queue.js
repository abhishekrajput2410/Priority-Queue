const { Queue } = require('bullmq');
const { isRedisAvailable, getQueueConnection } = require('../config/redis');

let deadLetterQueue;

const initDeadLetterQueue = () => {
  if (!isRedisAvailable()) {
    return;
  }

  deadLetterQueue = new Queue('deadLetterQueue', {
    connection: getQueueConnection(),
  });
};

const getDeadLetterQueue = () => deadLetterQueue;

module.exports = { initDeadLetterQueue, getDeadLetterQueue };
