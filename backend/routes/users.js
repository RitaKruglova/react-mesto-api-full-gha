const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUser, createUser, changeAvatar, changeUserInfo, login, getCurrentUser,
} = require('../controllers/users');
const { doesUserExist } = require('../middlewares/users');

const urlRegex = /https?:\/\/w?w?w?\.?.+\..+/;

router.get('/', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
}), getAllUsers);
router.get('/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
}), getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), doesUserExist);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.post('/signup', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().min(2),
    about: Joi.string().min(2),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    about: Joi.string().required().min(2),
  }),
}), changeUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().pattern(urlRegex),
  }),
}), changeAvatar);
router.post('/signin', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
