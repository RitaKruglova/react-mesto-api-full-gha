const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { handleCatch } = require('./middlewares/handlingError');
const errorClasses = require('./helpers/errorClasses');
const { checkDomain } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL } = process.env;

const app = express();

app.use(cookieParser());

mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger);
app.use(limiter);
app.use(checkDomain);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => {
  next(new errorClasses.NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(handleCatch);

app.listen(PORT, () => {
  console.log('test');
});
