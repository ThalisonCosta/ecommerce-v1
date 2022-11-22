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
  const [newLogin] = await usersModel.login(req.body.userEmail);
  bcrypt.compare(req.body.userPass, newLogin.userPass, (err, result) => {
    if (result) {
      const token = jwt.sign({
        id: newLogin.userId,
        email: newLogin.userEmail
      }, process.env.JWT_KEY, { expiresIn: '3h' });
      return res.status(200).send({
        message: 'Authentication success!',
        token: token
      });
    } else return res.status(401).send({ message: 'Authentication failed!' });
  });


  // const response = {
  //   message: 'User created succesfully!',
  //   user: {
  //     id: newLogin.insertId,
  //     email: req.body.userEmail
  //   }
  // };
  // return res.status(200).send(newLogin);
  // });
};


module.exports = {
  registrate,
  userLogin
};
