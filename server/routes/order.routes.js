const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/order.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create order from cart
router.post('/', createOrder);

// Get user orders
router.get('/', getOrders);

module.exports = router;