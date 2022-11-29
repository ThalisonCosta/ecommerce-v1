const connection = require('../models/connection');
const jwt = require('jsonwebtoken');

const validateOrderId = async (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM orders WHERE orderId = ?';
  const [order] = await connection.execute(query, [id]);
  if (order.length < 1) {
    return res.status(404).send({ message: 'orderId not found' });
  } else return next();
};

const validateProductId = async (req, res, next) => {
  const { productId } = req.body;
  const query = 'SELECT * FROM products WHERE productId = ?';
  const [products] = await connection.execute(query, [productId]);
  if (products.length === 0) {
    return res.status(404).send({ message: 'ProductId not found' });
  }
  next();
};

const allowed = async (req, res, next) => {
  const { id } = req.params;
  const querySearchEmail = 'SELECT userEmail FROM orders WHERE orderId = ?';
  const [DBEmail] = await connection.execute(querySearchEmail, [id]);

  const token = req.headers.authorization.split(' ')[1];
  const { refreshToken } = jwt.decode(token);
  const { userEmail } = jwt.decode(refreshToken);

  if (DBEmail[0].userEmail !== userEmail) {
    return res.status(401).send({ message: 'not allowed' });
  } else next();
};

module.exports = {
  validateProductId,
  validateOrderId,
  allowed
};
