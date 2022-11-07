const usersRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMyData,
} = require('../controllers/user');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidator');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getMyData);
usersRoutes.get('/:id', validateUserId, getUser);
usersRoutes.patch('/me', validateUserInfo, updateUserInfo);
usersRoutes.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRoutes;
