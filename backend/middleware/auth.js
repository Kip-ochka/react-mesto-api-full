const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { JWT_SECRET } = require('../utils/variables');

module.exports = (req, _, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
