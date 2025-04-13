const { createOrderFromCart, getUserOrders } = require('../services/order.service');

// Create order from cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod } = req.body;
    
    const result = await createOrderFromCart(userId, paymentMethod || 1);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders
};