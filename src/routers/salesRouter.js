const { Router } = require('express');

const salesRouter = Router();

const salesController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSales');

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.post('/', validateSales, salesController.registerSales);

module.exports = salesRouter;