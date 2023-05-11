const { Router } = require('express');

const productsRouter = Router();

const productsController = require('../controllers/productsController');

const validateProducts = require('../middlewares/validateProducts');

productsRouter.get('/', productsController.getAll);
productsRouter.get('/:id', productsController.getById);
productsRouter.put('/:id', validateProducts, productsController.updateProduct);
productsRouter.post('/', validateProducts, productsController.registerProducts);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;