const connection = require('../models/connection');

const inUse = async (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM orders WHERE productId = ?';
  const [orders] = await connection.execute(query, [id]);
  if (orders.length > 0) {
    return res.status(409).send({ message: 'Product selected is in use' });
  } else {
    console.log(orders);
    next();
  }
};

module.exports = inUse;
