const config = require('./utils/config.js');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const weekRouter = require('./controllers/week.js');
const taskRouter = require('./controllers/task.js');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware.js');
const mongoose = require('mongoose');

logger.info('connecting to db');

mongoose
  .connect(config.MONGODB_URI)
  .then(logger.info('connected to db'))
  .catch((error) => logger.error('coudlnt connect to db', error));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/week', middleware.tokenExtractor, weekRouter);
app.use('/api/task', middleware.tokenExtractor, taskRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
