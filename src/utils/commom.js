const jwt = require('jsonwebtoken');

function checkUserId(token) {
  const { refreshToken } = jwt.decode(token);
  const { userId } = jwt.decode(refreshToken);
  return userId;
}

module.exports = checkUserId;
