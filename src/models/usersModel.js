const { randomUUID } = require('crypto');
const connection = require('./connection');

const registrate = async (user, hash) => {
  const { userName, userEmail } = user;
  const uid = randomUUID().toString();
  const query = 'INSERT INTO users (userId, userName, userEmail, userPass) VALUES (?,?,?,?)';
  const [userCreated] = await connection.execute(query, [uid, userName, userEmail, hash]);
  return userCreated;

};

const login = async (email) => {
  const query = 'SELECT * FROM users WHERE userEmail = ?';
  const [userLogin] = await connection.execute(query, [email]);
  return userLogin;
};

module.exports = {
  registrate,
  login
};
