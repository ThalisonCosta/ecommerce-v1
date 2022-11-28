const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registrate = async (req, res) => {
  bcrypt.hash(req.body.userPassword, 10, async (errBcrypt, hash) => {
    if (errBcrypt) {
      return res.status(500).send({ error: errBcrypt });
    }
    const newUser = await usersModel.registrate(req.body, hash);
    const response = {
      message: 'User created succesfully!',
      user: {
        id: newUser.insertId,
        email: req.body.userEmail
      }
    };
    return res.status(201).send(response);
  });
};

const userLogin = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const [newLogin] = await usersModel.login(userEmail);
  bcrypt.compare(userPassword, newLogin.userPass, (err, result) => {
    if (result) {
      const refreshToken = jwt.sign({ userEmail, userPassword }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '90d' });
      const token = jwt.sign({ refreshToken }, process.env.JWT_KEY, { expiresIn: '1800s' });
      return res.status(200).send({
        message: 'Authentication success!',
        accessToken: token,
        refreshToken: refreshToken
      });
    } else return res.status(401).send({ message: 'Authentication failed!' });
  });
};


const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const token = jwt.sign({ refreshToken }, process.env.JWT_KEY, { expiresIn: '1800s' });
  return res.json({ token });
};

module.exports = {
  registrate,
  userLogin,
  refreshToken
};
