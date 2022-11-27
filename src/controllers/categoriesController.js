const categoryModel = require('../models/categoryModel');

const allCategories = async (req, res) => {
  const allCategories = await categoryModel.allCategories();
  return res.status(200).send(allCategories);
};

const productsByCategory = async (req, res) => {
  const products = await categoryModel.productsByCategory(req.params.id);
  if (products.length < 1) { return res.status(200).send({ message: 'no products in this category' }); }
  const response = {
    total: products.length,
    products: products.map(prod => {
      return {
        id: prod.productId,
        name: prod.productName,
        price: prod.price,
        description: prod.productDescription,
        url: `${process.env.BASE_URL}products/${prod.productId}`,
        image: process.env.BASE_URL + prod.productImage
      };
    })
  };
  return res.status(200).send(response);
};

module.exports = {
  allCategories,
  productsByCategory
};
