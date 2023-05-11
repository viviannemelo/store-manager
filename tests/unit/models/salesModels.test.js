const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');

const {
  allSales,
  saleById
} = require('./mock/sales.mock');

describe('Testing Sales Model layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());

    it('getAllSales return data', async () => {
      sinon.stub(connection, 'execute').resolves([allSales]);

      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(allSales);
      expect(result).to.have.length(3);
      expect(result[0]).to.have.keys([
        "saleId",
        "date",
        "productId",
        "quantity",
      ]);
    });

    it('getSalesById returns correct answer', async () => {
      sinon.stub(connection, 'execute').resolves([saleById]);

      const result = await salesModel.getSalesById(1);

      expect(result).to.be.equals(saleById);
    });
  });

  describe('Failure case', () => {
    afterEach(() => sinon.restore());

    it('getAllSales return no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  })
});