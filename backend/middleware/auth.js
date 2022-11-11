const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, _, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Unauthorized('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
