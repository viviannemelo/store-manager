const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

const { allProducts, newProduct } = require('./mock/products.mock');

describe('Testing Products Model layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());
    
    it('getAll return data', async () => {
      sinon.stub(connection, 'execute').resolves([[allProducts] ]);

      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
    });

    it('getById returns correct answer', async () => {
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(allProducts[0]);
    });

    it('Add product correctly', async () => {
      sinon.stub(connection, 'execute').resolves([newProduct]);

      const result = await productsModel.registerProducts('Capa do Batman');

      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'name']);
    });
  });

  describe('Failure case', () => {
    afterEach(() => sinon.restore());

    it('getAll return no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });
});