const connection = require('./connection');
const { unlink } = require('fs');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const createProduct = async (product, fileName) => {
  const { productName, price, productDescription, categoryId } = product;
  const productImage = `uploads/${fileName}`;
  const query = 'INSERT INTO products (productName, price, productDescription, productImage, categoryId) VALUES(?,?,?,?,?)';
  const [createdProduct] = await connection.execute(query, [productName, price, productDescription, productImage, categoryId]);
  return { id: createdProduct.insertId };
};

const getOneProduct = async (id) => {
  const query = 'SELECT * FROM products WHERE productId = ?';
  const [productSelected] = await connection.execute(query, [id]);
  return productSelected;
};

const editProduct = async (id, product) => {
  const { productName, price, productDescription, categoryId } = product;
  if (productName) {
    const query = 'UPDATE products SET productName = ? WHERE productId = ?';
    const [newName] = await connection.execute(query, [productName, id]);
    return newName;
  }
  if (price) {
    const query = 'UPDATE products SET price = ? WHERE productId = ?';
    const [newPrice] = await connection.execute(query, [price, id]);
    return newPrice;
  }
  if (productDescription) {
    const query = 'UPDATE products SET productDescription = ? WHERE productId = ?';
    const [newDescription] = await connection.execute(query, [productDescription, id]);
    return newDescription;
  }
  if (categoryId) {
    const query = 'UPDATE products SET categoryId = ? WHERE productId =?';
    const [newCategory] = await connection.execute(query, [categoryId, id]);
    return newCategory;
  }
};

const deleteProduct = async (id) => {
  const [deleteImage] = await connection.execute(`SELECT productImage FROM products WHERE productId = ${[id]}`);
  const imageName = JSON.stringify(deleteImage).split('/')[1].split('"')[0];
  unlink(`src/assets/${imageName}`, (err) => {
    if (err) throw err;
  });

  const query = 'DELETE FROM products WHERE productId = ?';
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
