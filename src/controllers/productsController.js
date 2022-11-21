const productsModel = require('../models/productsModel');

const allProducts = async (req, res) => {
  const products = await productsModel.getAll();
  if (await products.length === 0) {
    return res.status(204).send();
  }
  return res.status(200).send(products);
};

const oneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getOneProduct(id);
  if (await product.length === 0) {
    return res.status(200).send({ message: 'product not exists' });
  }
  return res.status(200).send(product);
};

const createProduct = async (req, res) => {
  const createdProduct = await productsModel.createProduct(req.body);
  return res.status(201).send(createdProduct);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await productsModel.editProduct(id, body);
  return res.status(202).send(body);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.deleteProduct(id);
  if (product.length === 0) {
    return res.status(200).send({ message: 'Cant delete because product not exists' });
  }
  return res.status(204).send();
};

module.exports = {
  allProducts,
  oneProduct,
  createProduct,
  editProduct,
  deleteProduct
};
