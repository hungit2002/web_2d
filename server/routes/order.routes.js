const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  generateLicences,
  sendLicenseEmailForOrder
} = require('../controllers/order.controller');

// Create order
router.post('/', authMiddleware, createOrder);

// Get user orders
router.get('/', authMiddleware, getOrders);

// Get order by ID
router.get('/:id', authMiddleware, getOrderById);

// Update order status
router.patch('/:id/status', authMiddleware, updateOrderStatus);

// Generate licences for order
router.post('/:id/licences', authMiddleware, generateLicences);

// Send license email for order
router.post('/:id/send-license-email', authMiddleware, sendLicenseEmailForOrder);

module.exports = router;