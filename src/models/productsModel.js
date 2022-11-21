const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const createProduct = async (product) => {
  const { productName, price } = product;
  const query = 'INSERT INTO products (productName, price) VALUES(?,?)';
  console.log(productName);
  const [createdProduct] = await connection.execute(query, [productName, price]);
  return { id: createdProduct.insertId };
};

const getOneProduct = async (id) => {
  const query = 'SELECT * FROM products WHERE productId = ?';
  const [productSelected] = await connection.execute(query, [id]);
  return productSelected;
};

const editProduct = async (id, product) => {
  const { productName, price } = product;
  const query = 'UPDATE products SET productName = ?, price = ? WHERE productId = ?';
  const [productEdited] = await connection.execute(query, [productName, price, id]);
  return productEdited;
};

const deleteProduct = async (id) => {
  const query = 'DELeTE FROM products WHERE productId = ?';
  const productDeleted = await connection.execute(query, [id]);
  return productDeleted;
};

module.exports = {
  getAll,
  createProduct,
  getOneProduct,
  editProduct,
  deleteProduct
};
