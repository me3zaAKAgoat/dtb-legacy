const logger = require('./logger');
const jwt = require('jsonwebtoken');
const config = require('./config');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:', req.path);
	logger.info('Body:', req.body);
	logger.info('Time:', new Date());
	logger.info('----:');
	next();
};

const errorHandler = (err, req, res, next) => {
	logger.error(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'invalid token',
		});
	}

	next(err);
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		req.token = authorization.substring(7);
	}

	next();
};

const checkTokenExpiration = (req, res, next) => {
	const token = req.token;
	if (!token) {
		return res.status(401).json({ error: 'token missing' });
	}
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		if (decodedToken.exp < Date.now() / 1000) {
			return res.status(401).json({ error: 'token expired' });
		}
	} catch (err) {
		return res.status(401).json({ error: 'invalid token' });
	}
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'uknown endpoint' });
};

module.exports = {
	requestLogger,
	errorHandler,
	tokenExtractor,
	checkTokenExpiration,
	unknownEndpoint,
};
