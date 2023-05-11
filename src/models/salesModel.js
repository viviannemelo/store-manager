const connection = require('./connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sales_products.sale_id as saleId, sales.date as date,
    sales_products.product_id as productId, sales_products.quantity as quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON sales.id = sales_products.sale_id
    ORDER BY sales_products.sale_id, sales_products.product_id`,
  );
  return sales;
};

const getSalesById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT sales.date as date,
    sales_products.product_id as productId, sales_products.quantity as quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON sales.id = sales_products.sale_id
    WHERE sales_products.sale_id = (?)
    ORDER BY sales_products.sale_id, sales_products.product_id`,
    [id],
  );
  return sales;
};

const registerSales = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  
  const productSold = await Promise.all(
    sale.map(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
        [insertId, productId, quantity],
      );
      return { productId, quantity };
    }),
  );
  return { id: insertId, itemsSold: productSold };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSales,
};