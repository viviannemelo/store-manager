const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');

const { allProducts } = require('../models/mock/products.mock');

describe('Testing Products Controllers layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());

    it('getAll return data', async () => {
      sinon.stub(productsService, 'getAll').resolves({
        "id": 2,
        "name": "Traje de encolhimento"
      });

      const req = {
        body: {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      };

      const res = {};
      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
      );
    });

    it('getById returns correct answer', async () => {
      sinon.stub(productsService, 'getById').resolves({
        type: null,
        message: allProducts[0],
      });

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.json = sinon.stub().returns();
      res.status = sinon.stub().returns(res);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });


    it('Delete product correctly', async () => {
      sinon.stub(productsService, 'deleteProduct').resolves({
        type: null,
        status: 204,
      });

      const req = {
        params: {
          id: 2,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
  });

  describe('Failure case', () => {
    afterEach(() => sinon.restore());

    it('Id that doesnt existing', async () => {
      sinon.stub(productsService, 'getById').resolves({
        type: 404,
        message: "Product not found",
      });

      const req = {
        params: {
          id: 99,
        },
      };
      const res = {};
      res.json = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});