const connection = require('./connection');

const allCategories = async () => {
  const query = 'SELECT * FROM categories';
  const [categories] = await connection.execute(query);
  return categories;
};

const productsByCategory = async (id) => {
  const query = 'SELECT * FROM products WHERE categoryId = ?';
  const [products] = await connection.execute(query, [id]);
  return products;
};

module.exports = {
  allCategories,
  productsByCategory
};
