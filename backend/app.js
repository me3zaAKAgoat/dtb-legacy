const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const weekRouter = require('./controllers/week.js');
const taskRouter = require('./controllers/task.js');
const middleware = require('./utils/middleware.js');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(
	'/api/week',
	middleware.tokenExtractor,
	middleware.checkTokenExpiration,
	weekRouter
);
app.use(
	'/api/task',
	middleware.tokenExtractor,
	middleware.checkTokenExpiration,
	taskRouter
);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
