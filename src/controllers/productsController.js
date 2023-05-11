const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  if (!products) {
    return res.status(404).send({ message: 'Product not found' });
  }
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const registerProducts = async (req, res) => {
  const product = req.body;
  const result = await productsService.registerProducts(product);
  return res.status(201).json(result);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct({ id, name });
  if (type === 404) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  updateProduct,
  deleteProduct,
};
