const productsModel = require('../models/productsModel');

module.exports = async (req, res, next) => {
  const products = req.body;

  const productId = products.some((item) => !item.productId);
  if (productId) return res.status(400).json({ message: '"productId" is required' });
  
  const arrayProducts = products.map((product) => productsModel.getById(product.productId));
  const result = await Promise.all(arrayProducts);
  if (result.includes(undefined)) return res.status(404).json({ message: 'Product not found' });

  const quantity = products.some((item) => item.quantity === undefined);
  if (quantity) return res.status(400).json({ message: '"quantity" is required' });

  const validQuantity = products.some((item) => item.quantity <= 0);
  if (validQuantity) {
    return res.status(422).json(
      { message: '"quantity" must be greater than or equal to 1' },
    );
  }

  next();
};