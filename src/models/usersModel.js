const connection = require('./connection');

const registrate = async (user, hash) => {
  const { userName, userEmail } = user;
  const query = 'INSERT INTO users (userName, userEmail, userPass) VALUES (?,?,?)';
  const [userCreated] = await connection.execute(query, [userName, userEmail, hash]);
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
