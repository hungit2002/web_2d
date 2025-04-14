const { createOrderFromCart, getUserOrders, getOrderById, updateOrderStatus } = require('../services/order.service');

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

// Get order by ID
const getOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await getOrderById(userId, orderId);
    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update order status
const updateOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, transactionId } = req.body;
    const userId = req.user.id;

    const updatedOrder = await updateOrderStatus(orderId, status, transactionId, userId);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  createOrder,
  getOrders,
  getOrderById: getOrderByIdController,
  updateOrderStatus: updateOrderStatusController
};