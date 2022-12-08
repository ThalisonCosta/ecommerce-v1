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

  Object.keys(product).forEach(async (key) => {

    for (let index = 0; index < key.length; index++) {
      let params = product[key];
      let query = `UPDATE products SET ${key} = ? WHERE productId = ?`;
      let [newProduct] = await connection.execute(query, [params, id]);
      return newProduct;
    }
  });
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
