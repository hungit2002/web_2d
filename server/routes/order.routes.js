const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require('../controllers/order.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create order from cart
router.post('/', createOrder);

// Get user orders
router.get('/', getOrders);

// Get specific order by ID
router.get('/:id', getOrderById);

module.exports = router;