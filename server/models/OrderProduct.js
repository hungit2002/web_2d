const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderProduct = sequelize.define('OrderProduct', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'products',
      key: 'id'
    }
  }
}, {
  tableName: 'order_products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = OrderProduct; 