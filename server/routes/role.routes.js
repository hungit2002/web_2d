const express = require('express');
const router = express.Router();
const { createRoleHandler, assignRoleHandler } = require('../controllers/role.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');

// Only admin can create roles and assign roles
router.post('/create', adminAuthMiddleware, createRoleHandler);
router.post('/assign', adminAuthMiddleware, assignRoleHandler);

module.exports = router;