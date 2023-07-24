const User = require('../models/user');

module.exports.doesUserExist = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.send('Такого пользователя не существует');
        return;
      }
      next();
    });
};
