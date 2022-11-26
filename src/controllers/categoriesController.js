const categoryModel = require('../models/categoryModel');

const allCategories = async (req, res) => {
  const allCategories = await categoryModel.allCategories();
  return res.status(200).send(allCategories);
};

const productsByCategory = async (req, res) => {
  const products = await categoryModel.productsByCategory(req.params.id);
  if (products.length < 1) { return res.status(200).send({ message: 'no products in this category' }); }
  return res.status(200).send(products);
};

module.exports = {
  allCategories,
  productsByCategory
};
