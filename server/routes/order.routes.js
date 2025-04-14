const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/order.controller');

// Create order
router.post('/', authMiddleware, createOrder);

// Get user orders
router.get('/', authMiddleware, getOrders);

// Get order by ID
router.get('/:id', authMiddleware, getOrderById);

// Update order status
router.patch('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;