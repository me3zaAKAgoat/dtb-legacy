const app = require('./app');
const http = require('http');
const config = require('./utils/config.js');
const logger = require('./utils/logger.js');
const mongoose = require('mongoose');

logger.info('connecting to db');

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to db');
		const server = http.createServer(app);

		server.listen(config.PORT, () => {
			logger.info(`Server running on port ${config.PORT}`);
		});
	})
	.catch((error) => {
		logger.error('coudlnt connect to db', error);
	});
