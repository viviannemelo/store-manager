const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

const { allProducts } = require('../models/mock/products.mock');

describe('Testing Product Services layer', () => {
  describe('Success case', () => {
    afterEach(() => sinon.restore());

    it('getAll return data', async () => {
      sinon.stub(productsModel, 'getAll').resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }
      ]);

      const result = await productsService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });

    it('getById returns correct answer', async () => {
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

      const result = await productsModel.getById(1);
      expect(result).to.be.deep.equal(allProducts[0]);

      const { type, message } = await productsService.getById(1);
      expect(type).to.be.null;
      expect(message).to.be.equal(result)
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

    it('Wrong Id', async () => {
      sinon.stub(productsModel, 'getById').resolves(undefined);

      const result = await productsService.getById(99);

      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.deep.equal('Product not found');
    });

    it('Name doesnt have the rigth length', async () => {
      sinon.stub(productsService, 'registerProducts').resolves({
        type: 422,
        message: '"name" length must be at least 5 characters long',
      });

      const req = {
        body: {
          name: 'abc'
        },
      };

      const res = {};

      const { type, message } = await productsService.registerProducts(req, res);

      expect(type).to.be.equal(422);
      expect(message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });
});