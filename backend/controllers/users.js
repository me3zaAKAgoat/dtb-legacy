const usersRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res) => {
	try {
		const userExists = await User.findOne({ username: req.body.username });
		if (userExists) {
			return res.status(400).json({
				error: 'Username already taken',
			});
		}

		const fitsRequirements = [
			req.body.username,
			req.body.name,
			req.body.password,
		].every((field) => {
			return field.length > 4;
		});

		if (!fitsRequirements) {
			return res
				.status(406)
				.json({ error: 'all fields must be more than 4 characters long' });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

		const user = new User({
			username: req.body.username,
			name: req.body.name,
			passwordHash: passwordHash,
			activeWeek: null,
		});

		const savedUser = await user.save();

		return res.status(201).json(savedUser);
	} catch (err) {
		console.log('usersRouter', err);
		return res.status(500).json({ erro: err });
	}
});

module.exports = usersRouter;
