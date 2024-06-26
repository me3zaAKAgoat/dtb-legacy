const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const weekRouter = require('./controllers/week.js');
const taskRouter = require('./controllers/task.js');
const adminRouter = require('./controllers/admin.js');
const avatarsRouter = require('./controllers/avatars.js');
const middleware = require('./utils/middleware.js');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/avatar', avatarsRouter);
app.use('/admin', adminRouter);
app.use(
	'/api/users',
	middleware.tokenExtractor,
	middleware.checkTokenExpiration,
	usersRouter
);
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

app.use(express.static('build'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
