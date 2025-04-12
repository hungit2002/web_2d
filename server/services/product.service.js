const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const getAllProducts = async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const whereClause = search ? {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ]
  } : {};

  const { count, rows } = await db.Product.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    include: [{
      model: db.Category,
      as: 'category',
      attributes: ['id', 'name']
    }],
    order: [['id', 'DESC']]
  });

  return {
    products: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getProductById = async (productId) => {
  const product = await db.Product.findByPk(productId, {
    include: [{
      model: db.Category,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

const createProduct = async (productData, imageFile) => {
  // Handle image upload if provided
  let imagePath = null;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const fileName = `product-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `products/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Create product with image path
  return await db.Product.create({
    ...productData,
    image: imagePath
  });
};

const updateProduct = async (productId, productData, imageFile) => {
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Handle image upload if provided
  let imagePath = product.image;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Delete old image if exists
    if (product.image) {
      const oldImagePath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    const fileName = `product-${productId}-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `products/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Update product with new data and image path
  return await product.update({
    ...productData,
    image: imagePath
  });
};

const deleteProduct = async (productId) => {
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Delete product image if exists
  if (product.image) {
    const imagePath = path.join(__dirname, '../uploads', product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await product.destroy();
  return { message: 'Product deleted successfully' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};