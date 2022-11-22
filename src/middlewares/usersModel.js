const connection = require('../models/connection');

const duplicate = async (req, res) => {
  const query = 'SELECT * FROM users WHERE userEmail = ?';
  const [result] = await connection.execute(query, [req.body.userEmail]);
  if (result.length > 0) {
    res.status(409).send({ message: 'user already created!' });
  }
};

module.exports = duplicate;
