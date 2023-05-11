const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

const {
  saleById,
  allSales,
} = require('../models/mock/sales.mock');

describe('Testing Sales Controller layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());

    it('getAllSales returns data', async () => {
      sinon.stub(salesService, 'getAllSales').resolves({ type: null, message: allSales });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('getSalesById returns correct answer', async () => {
      sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: saleById });

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });
  });

  describe('Failure case', () => {
    afterEach(() => sinon.restore());

    it('Id that doesnt existing', async () => {
      sinon.stub(salesService, 'getSalesById').resolves({ type: 404, message: 'Sale not found' });

      const req = {
        params: {
          id: 99,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
});