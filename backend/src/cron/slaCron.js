const { checkSlaBreaches } = require('../services/sla.service');
const { logger } = require('../config/logger');

const slaCron = () => {
  const run = async () => {
    try {
      await checkSlaBreaches();
      logger.info('SLA cron completed');
    } catch (err) {
      logger.error('SLA cron failed', err);
    }
  };

  run();
  setInterval(run, 15000);
};

module.exports = { slaCron };
