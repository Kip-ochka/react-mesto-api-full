const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Matched = require('../errors/matched');
const { JWT_SECRET } = require('../utils/variables');

module.exports.getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с таким id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный формат id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }).then((user) => { res.send(user); })
      .catch((err) => {
        if (err.code === 11000) {
          next(new Matched('Пользователь с данным email уж существует'));
        } else if (err.name === 'ValidationError') {
          next(new BadRequest('Ошибка валидации'));
        } else {
          next(err);
        }
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { maxAge: 3600 * 24 * 7, httpOnly: true, sameSite: true })
        .send({ email });
    }).catch((err) => {
      next(err);
    });
};

module.exports.logout = (_, res, next) => {
  res.clearCookie('token').send({ message: 'Вы вышли из профиля' })
    .catch((err) => {
      next(err);
    });
};

const updateData = (req, res, next, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Отправленные данные некорректный, перепроверьте данные.'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Не корректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateData(req, res, next, userData);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userData = {
    avatar: req.body.avatar,
  };
  updateData(req, res, next, userData);
};

module.exports.getMyData = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
