const mestodb = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/unauthorized');

const { Schema } = mestodb;

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'имя должно содержать минимум 2 символа'],
    maxlength: [30, 'максимальная длина имени 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'описание должно содержать минимум 2 символа'],
    maxlength: [30, 'максимальная длина описания 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: ({ value }) => `${value} - некоректный адрес URL. Ожидается URL в формате: http(s)://(www).page.com`,
    },
  },
  email: {
    type: String,
    requared: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный адрес email`,
    },
  },
  password: {
    type: String,
    requared: true,
    select: false,
  },
}, {
  versionKey: false,
  toObject: { useProjection: true },
  toJSON: { useProjection: true },
});

userSchema.statics.findUser = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mestodb.model('user', userSchema);
