const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');

const { allSales, saleById } = require('../models/mock/sales.mock');

describe('Testing Sales Services layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());

    it('getAllSales return data', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);

      const result = await salesService.getAllSales();
      expect(result.type).to.be.null;
      expect(result.message).to.be.equal(allSales);
    });

    it('getSalesById returns correct answer', async () => {
      sinon.stub(salesModel, 'getSalesById').resolves(saleById);

      const result = await salesService.getSalesById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(saleById);
    });
  });
  describe('Failure case', () => {
    afterEach(() => sinon.restore());

    it('If in case of wrong Id returns failure answer', async () => {
      sinon.stub(salesModel, 'getSalesById').resolves([]);

      const result = await salesService.getSalesById(99);

      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.deep.equal('Sale not found');
    });
  });
});