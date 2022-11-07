const Cards = require('../models/card');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (_, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.send(cards);
    }).catch(next);
};

module.exports.createCards = (req, res, next) => {
  const { name, link } = req.body;
  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Ошибка валидации'));
      } else { next(err); }
    });
};

module.exports.deleteCards = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с таким id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Невозможно удалить чужие карточки');
      }
      return Cards.findByIdAndDelete(req.params.cardId).then(() => {
        res.send({ message: 'Карточка удалена' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Не корректный _id карточки'));
      } else {
        next(err);
      }
    });
};

const handleLike = (req, res, next, options) => {
  const action = options.addLike ? '$addToSet' : '$pull';
  Cards.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      return Cards.findByIdAndUpdate(
        req.params.cardId,
        { [action]: { likes: req.user._id } },
        { new: true },
      ).then((updatedCard) => {
        res.send(updatedCard);
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Не корректный _id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  handleLike(req, res, next, { addLike: true });
};

module.exports.dislikeCard = (req, res, next) => {
  handleLike(req, res, next, { addLike: false });
};
