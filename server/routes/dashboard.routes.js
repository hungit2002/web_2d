const express = require('express');
const router = express.Router();
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const {
  getDashboardStats,
  getRevenueData,
  getUserRegistrationData,
  getOrderData
} = require('../controllers/dashboard.controller');

// Get dashboard statistics
router.get('/stats', adminAuthMiddleware, getDashboardStats);

// Get revenue data for charts
router.get('/revenue', adminAuthMiddleware, getRevenueData);

// Get user registration data for charts
router.get('/users', adminAuthMiddleware, getUserRegistrationData);

// Get order data for charts
router.get('/orders', adminAuthMiddleware, getOrderData);

module.exports = router;