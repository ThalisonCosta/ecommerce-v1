const connection = require('../models/connection');

const duplicate = async (req, res, next) => {
  const query = 'SELECT * FROM users WHERE userEmail = ?';
  const [result] = await connection.execute(query, [req.body.userEmail]);
  if (result.length > 0) {
    return res.status(409).send({ message: 'user already created!' });
  }
  next();
};

const notExists = async (req, res, next) => {
  const query = 'SELECT * FROM users WHERE userEmail = ?';
  const [result] = await connection.execute(query, [req.body.userEmail]);
  if (result.length < 1) {
    return res.status(401).send({ message: 'Authentication failed!' });
  }
  next();
};

module.exports = {
  duplicate,
  notExists
};
