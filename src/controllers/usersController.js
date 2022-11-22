const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

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

const login = async (req, res) => { };

module.exports = {
  registrate,
  login
};
