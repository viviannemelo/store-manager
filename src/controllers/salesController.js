const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const registerSales = async (req, res) => {
  const sale = req.body;
  const sales = await salesService.registerSales(sale);
  return res.status(201).json(sales);
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
};