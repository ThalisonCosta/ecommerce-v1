const productsModel = require('../models/productsModel');

const allProducts = async (req, res) => {
  const products = await productsModel.getAll();
  if (await products.length === 0) {
    return res.status(204).send();
  }
  const response = {
    total: products.length,
    products: products.map(prod => {
      return {
        id: prod.productId,
        name: prod.productName,
        price: prod.price,
        url: 'http://localhost:8080/products/' + prod.productId
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
    name: product[0].productName,
    price: product[0].price,
    url: 'http://localhost:8080/products/'
  };

  return res.status(200).send(response);
};

const createProduct = async (req, res) => {
  const productCreated = await productsModel.createProduct(req.body);
  const response = {
    message: 'Product created succesfully!',
    newProduct: {
      id: productCreated.id,
      name: req.body.productName,
      price: req.body.price,
      url: 'http://localhost:8080/products/'
    }
  };
  return res.status(201).send(response);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await productsModel.editProduct(id, body);
  const response = {
    message: 'Product created succesfully!',
    newProduct: {
      id: id,
      name: req.body.productName,
      price: req.body.price,
      url: 'http://localhost:8080/products/' + id
    }
  };
  return res.status(202).send(response);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.deleteProduct(id);
  if (product.length === 0) {
    return res.status(404).send({ message: 'Cant delete because product not exists' });
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
