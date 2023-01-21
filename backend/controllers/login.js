const config = require('../utils/config.js');
const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const tokenExpirationParam = 60 * 60; //expiration of a user session
		if (user === null) {
			return res.status(401).json({ error: 'Username not found' });
		}

		const passwordCheck = await bcrypt.compare(
			req.body.password,
			user.passwordHash
		);

		if (!passwordCheck) {
			return res.status(401).json({ error: 'Password is incorrect' });
		}

		const tokenPayload = {
			id: user._id,
		};

		const token = jwt.sign(tokenPayload, config.SECRET, {
			expiresIn: tokenExpirationParam,
		});

		return res.status(200).json({
			username: user.username,
			name: user.name,
			token: token,
			currentWeek: user.currentWeek,
			expiresIn: tokenExpirationParam,
		});
	} catch (err) {
		console.log('loginRouter', err);
		return res.status(500).json({ erro: err });
	}
});

module.exports = loginRouter;
