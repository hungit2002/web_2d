const db = require('../models');
const { Op } = require('sequelize');
const { clearUserCart } = require('./cart.service');

// Create a new order from cart items
const createOrderFromCart = async (userId, paymentMethod = 1) => {
  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    // Get cart items
    const cartItems = await db.CartItem.findAll({
      where: { user_id: userId },
      include: [
        {
          model: db.Product,
          as: 'product',
          attributes: ['id', 'name', 'priceSale']
        }
      ],
      transaction
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.product.priceSale) * item.quantity);
    }, 0);

    // Create order
    const order = await db.Order.create({
      cid: userId,
      payment_method: paymentMethod,
      price: totalPrice,
      status: 'pending'
    }, { transaction });

    // Create order products
    const orderProducts = [];
    for (const item of cartItems) {
      await db.OrderProduct.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.priceSale
      }, { transaction });

      orderProducts.push({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.product.priceSale
      });
    }

    // Clear the cart
    await clearUserCart(userId, transaction);

    // Commit transaction
    await transaction.commit();

    return {
      order,
      orderProducts
    };
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    throw error;
  }
};

// Get user orders
const getUserOrders = async (userId) => {
  const orders = await db.Order.findAll({
    where: { cid: userId },
    include: [
      {
        model: db.Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price']
        },
        include: [
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ]
      }
    ],
    order: [['created_at', 'DESC']]
  });

  return orders;
};

// Get order by ID
const getOrderById = async (userId, orderId) => {
  const order = await db.Order.findOne({
    where: { 
      id: orderId,
      cid: userId // Ensure user can only access their own orders
    },
    include: [
      {
        model: db.Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price']
        },
        include: [
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ]
      }
    ]
  });
  
  if (!order) {
    throw new Error('Order not found');
  }
  
  return order;
};

// Update order status
const updateOrderStatus = async (orderId, status, transactionId, userId) => {
  const order = await db.Order.findOne({
    where: { 
      id: orderId,
      cid: userId // Ensure user can only access their own orders
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  // Update order status and transaction ID
  await order.update({
    status,
    transaction_id: transactionId || null
  });

  return order;
};

module.exports = {
  createOrderFromCart,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};