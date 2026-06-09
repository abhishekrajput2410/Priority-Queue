const { ageRequests } = require('../services/aging.service');
const { logger } = require('../config/logger');

const agingCron = () => {
  const run = async () => {
    try {
      await ageRequests();
      logger.info('Aging cron completed');
    } catch (err) {
      logger.error('Aging cron failed', err);
    }
  };

  run();
  setInterval(run, 30000);
};

module.exports = { agingCron };
