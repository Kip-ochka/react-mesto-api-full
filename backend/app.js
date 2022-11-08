const express = require('express');
const mestodb = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { cors } = require('./middleware/cors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
mestodb.connect(MONGO_URL);
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // for 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.use(requestLogger);
app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
