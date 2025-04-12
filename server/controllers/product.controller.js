const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../services/product.service');

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllProducts(page, limit, search);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const productData = req.body;
    const imageFile = req.file;
    
    const product = await createProduct(productData, imageFile);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productData = req.body;
    const imageFile = req.file;
    
    const updatedProduct = await updateProduct(req.params.id, productData, imageFile);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createNewProduct,
  updateProductById,
  deleteProductById
};