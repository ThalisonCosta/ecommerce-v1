const allProducts = (req, res) => {
  return res.status(200).send({ message: 'tá ok' });
};

const oneProduct = (req, res) => {
  const { id } = req.params;
  return res.status(200).send({
    message: 'unique product',
    id: id
  });
};

const createProduct = (req, res) => {
  const body = req.body;
  return res.status(201).send({ message: 'created', product: body });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  return res.status(202).send({ message: `the ${id} was edited` });
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  return res.status(204).send({ message: `the ${id} was deleted` });
};

module.exports = {
  allProducts,
  oneProduct,
  createProduct,
  editProduct,
  deleteProduct
};
