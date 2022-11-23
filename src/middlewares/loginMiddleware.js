const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.users = decode;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid authorization token' });
  }
};

module.exports = login;
