const AuditLog = require('../models/auditLog.model');

const createAuditEntry = async ({ user, action, resource, metadata }) => AuditLog.create({
  user,
  action,
  resource,
  metadata,
});

module.exports = { createAuditEntry };
