const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
  );
  return products;
};

const registerProducts = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);', [product.name],
  );
  return { id: insertId, name: product.name };
};

const updateProduct = async ({ id, name }) => {
  const [{ updatedProduct }] = await connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?);',
    [name, id],
  );
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const [{ product }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
  registerProducts,
  updateProduct,
  deleteProduct,
};