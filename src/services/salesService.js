const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sales };
};

const registerSales = async (sale) => {
  const newSale = await salesModel.registerSales(sale);
  return newSale;
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
};