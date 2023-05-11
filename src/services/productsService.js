const productsModel = require('../models/productsModel');

const getAll = async (_req, res) => {
  try {
    const products = await productsModel.getAll();
    return products;
  } catch (e) {
    return res.status(404).send({ message: `${e}` });
  }
};

const getById = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const registerProducts = async (product) => {
  const newProduct = await productsModel.registerProducts(product);
  return newProduct;
};

const updateProduct = async ({ id, name }) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 404, message: 'Product not found' };

  await productsModel.updateProduct({ id, name });
  const updatedProduct = await productsModel.getById(id);
  return { type: 200, message: updatedProduct };
};

const deleteProduct = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 404, message: 'Product not found' };

  await productsModel.deleteProduct(id);
  return { type: null, status: 204 };
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  updateProduct,
  deleteProduct,
};