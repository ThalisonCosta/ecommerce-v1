const connection = require('./connection');

const registrate = async (user, hash) => {
  const { userName, userEmail } = user;
  const query = 'INSERT INTO users (userName, userEmail, userPass) VALUES (?,?,?)';
  const [userCreated] = await connection.execute(query, [userName, userEmail, hash]);
  return userCreated;

};

const login = async () => { return {}; };

module.exports = {
  registrate,
  login
};
