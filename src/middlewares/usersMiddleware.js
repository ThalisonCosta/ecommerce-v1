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

const emailFormat = (req, res, next) => {
  const email = req.body.userEmail;
  if (email === '' || email === undefined || !email.includes('@') || !email.includes('.') || email.length < 5) {
    return res.status(400).send({ message: 'invalid email' });
  } else next();

};

const userNameFormat = (req, res, next) => {
  const name = req.body.userName;
  if (name === '' || name === undefined || name.length < 3) {
    return res.status(400).send({ message: 'invalid userName' });
  } else next();
};

const userPasswordFormat = (req, res, next) => {
  const pass = req.body.userPassword;
  if (pass.length < 8 || pass === '' || pass === undefined) {
    return res.status(400).send({ message: 'invalid password' });
  } else next();
};


module.exports = {
  duplicate,
  notExists,
  emailFormat,
  userNameFormat,
  userPasswordFormat
};
