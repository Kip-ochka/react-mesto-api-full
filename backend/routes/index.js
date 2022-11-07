const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const cardsRoutes = require('./cardsRoutes');
const { login, createUser, logout } = require('../controllers/user');
const auth = require('../middleware/auth');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidator');
const NotFound = require('../errors/notFound');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUser);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('/signout', logout);
router.use(() => {
  throw new NotFound('Ресурс не найден. Проверьте URL и метод запроса');
});
module.exports = router;
