const cardsRoutes = require('express').Router();
const {
  getCards,
  createCards,
  deleteCards,
  dislikeCard,
  likeCard,
} = require('../controllers/card');
const { validateCardId, validateCardData } = require('../utils/validators/cardValidator');

cardsRoutes.get('/', getCards);
cardsRoutes.delete('/:cardId', validateCardId, deleteCards);
cardsRoutes.post('/', validateCardData, createCards);
cardsRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardsRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRoutes;
