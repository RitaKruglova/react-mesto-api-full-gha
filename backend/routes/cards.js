const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards');

const urlRegex = /https?:\/\/w?w?w?\.?.+\..+/;

router.get('/', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
}), getAllCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);
router.post('/', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(),
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    link: Joi.string().required().pattern(urlRegex),
  }),
}), createCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), putLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteLike);

module.exports = router;
