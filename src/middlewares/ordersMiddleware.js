const connection = require('../models/connection');

const validateProductId = async (req, res, next) => {
  const { productId } = req.body;
  const query = 'SELECT * FROM products WHERE productId = ?';
  const [products] = await connection.execute(query, [productId]);
  if (products.length === 0) {
    return res.status(404).send({ message: 'Produto não encotrado' });
  }
  next();
};

const validateOrderId = async () => {
  return {};
};

module.exports = {
  validateProductId,
  validateOrderId
};