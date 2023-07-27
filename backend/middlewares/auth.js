require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorClasses = require('../helpers/errorClasses');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  const { SECRET_KEY } = process.env;

  if (!token) {
    next(new errorClasses.UnauthorizedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch {
    next(new errorClasses.UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
