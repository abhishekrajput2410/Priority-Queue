const priorityScores = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  UNKNOWN: 5,
};

const scoreToPriority = (score) => Object.keys(priorityScores)
  .find((key) => priorityScores[key] === score) || 'UNKNOWN';

const normalizePriority = (priority) => priorityScores[priority] || priorityScores.UNKNOWN;

const escalatePriorityByWait = (currentScore, secondsWaiting) => {
  const escalation = Math.floor(secondsWaiting / 30);
  return Math.max(1, currentScore - escalation);
};

const escalatedSlaPriority = (deadline) => {
  const now = Date.now();
  return deadline < now ? priorityScores.CRITICAL : priorityScores.HIGH;
};

module.exports = { priorityScores, scoreToPriority, normalizePriority, escalatePriorityByWait, escalatedSlaPriority };
