const { handleThen } = require('../helpers/handlingErrors');
const Card = require('../models/card');
const errorClasses = require('../helpers/errorClasses');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => handleThen(cards, res))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new errorClasses.BadRequestError('Карточка не найдена');
      }
      if (req.user._id !== card.owner._id.toString()) {
        throw new errorClasses.ForbiddenError('Вы не можете удалить чужую карточку');
      }

      Card.deleteOne(card)
        .then(() => handleThen(card, res))
        .catch(next);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => handleThen(card, res, 201))
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => handleThen(card, res))
    .catch(next);
};
