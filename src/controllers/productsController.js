const productsModel = require('../models/productsModel');
require('dotenv').config();

const allProducts = async (req, res) => {
  const products = await productsModel.getAll();
  if (await products.length === 0) {
    return res.status(200).send({ message: 'no products registreted' });
  }
  const response = {
    total: products.length,
    products: products.map(prod => {
      return {
        id: prod.productId,
        category: prod.categoryId,
        name: prod.productName,
        price: prod.price,
        description: prod.productDescription,
        url: process.env.BASE_URL + 'products/' + prod.productId,
        image: process.env.BASE_URL + prod.productImage
      };
    })
  };

  return res.status(200).send(response);
};

const oneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getOneProduct(id);
  if (await product.length === 0) {
    return res.status(404).send({ message: 'product not exists' });
  }
  const response = {
    id: product[0].productId,
    category: product[0].categoryId,
    name: product[0].productName,
    price: product[0].price,
    description: product[0].productDescription,
    url: process.env.BASE_URL + product[0].productId,
    image: process.env.BASE_URL + product[0].productImage
  };

  return res.status(200).send(response);
};

const createProduct = async (req, res) => {
  const productCreated = await productsModel.createProduct(req.body, req.file.filename);
  const response = {
    message: 'Product created succesfully!',
    newProduct: {
      id: productCreated.id,
      name: req.body.productName,
      price: req.body.price,
      categoryId: parseInt(req.body.categoryId),
      description: req.body.productDescription,
      url: process.env.BASE_URL + 'products/',
      image: `${process.env.BASE_URL}uploads/${req.file.filename}`
    }
  };
  return res.status(201).send(response);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!Object.keys(body).length) {
    return res.status(404).send({ message: 'invalid body' });
  }

  await productsModel.editProduct(id, body);
  const response = {
    message: 'Product updated succesfully!',
    changes: {
      category: body.categoryId,
      name: body.productName,
      price: body.price,
      description: body.productDescription,
    },
  };
  return res.status(202).send(response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const [productDeleted] = await productsModel.deleteProduct(id);
  if (productDeleted.affectedRows === 0) {
    return res.status(404).send({ message: 'product not exists' });
  }
  return res.status(202).send({ message: 'Product deleted succesfully!' });
};

module.exports = {
  allProducts,
  oneProduct,
  createProduct,
  editProduct,
  deleteProduct
};
