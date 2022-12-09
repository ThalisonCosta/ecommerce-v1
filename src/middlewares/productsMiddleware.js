const connection = require('../models/connection');

const inUse = async (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM orders WHERE productId = ?';
  const [orders] = await connection.execute(query, [id]);
  if (orders.length > 0) {
    return res.status(409).send({ message: 'Product selected is in use' });
  } else {
    next();
  }
};

const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE productId = ?';
  const [products] = await connection.execute(query, [id]);
  if (products.length === 0) {
    return res.status(404).send({ message: 'ProductId not found' });
  }
  next();
};

const validateBody = async(req, res, next) =>{
  const {body} = req;
  const validBody = Object.keys(body).some(key => key === 'productName' || key === 'price' || key === 'productDescription' || req.file.fieldname === 'productImage' || key === 'categoryId');

  if(validBody === false) {
    return res.status(404).send({message: 'invalid body!'});
  }

  next();
};


module.exports = {
  inUse,
  validateBody,
  validateProductId
};
