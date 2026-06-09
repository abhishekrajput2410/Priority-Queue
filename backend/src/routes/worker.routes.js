const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { handleGetWorkers } = require('../controllers/worker.controller');

const router = express.Router();
router.use(authMiddleware);
router.get('/', authorize(['Admin']), handleGetWorkers);
module.exports = router;
