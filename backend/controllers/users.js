const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

usersRouter.post('/newUser', async (req, res) => {
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

		await user.save();

		return res.status(201);
	} catch (err) {
		console.log('usersRouter', err);
		return res.status(500).json({ error: err });
	}
});

usersRouter.post('/updateUsername', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const usernameExists = await User.find({ username: req.body.username });

		if (usernameExists.length) {
			return res.status(500).json({ error: 'username already exists' });
		}

		user.username = req.body.username;

		await user.save();

		return res.status(201).json({ username: user.username });
	} catch (err) {
		console.log('usersRouter', err);
		return res.status(500).json({ error: err });
	}
});

usersRouter.post('/updatePassword', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const passwordCheck = await bcrypt.compare(
			req.body.currentPassword,
			user.passwordHash
		);

		if (!passwordCheck)
			return res.status(500).json({ error: 'current password is incorrect' });

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(req.body.newPassword, saltRounds);

		user.passwordHash = passwordHash;

		await user.save();

		return res.status(201);
	} catch (err) {
		console.log('usersRouter', err);
		return res.status(500).json({ error: err });
	}
});

const compressImage = async (file) => {
	try {
		return await sharp(file.buffer).resize(250, 250).toBuffer();
	} catch (error) {
		console.error('Error compressing image:', error);
	}
};

const storage = multer.memoryStorage();

const upload = multer({ storage });

usersRouter.post('/updateAvatar', upload.single('avatar'), async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const uploadedFile = req.file;

		const compressedImage = await compressImage(uploadedFile);
		await fs.promises.writeFile(
			path.join(__dirname, `../avatars/${user.userId}.jpeg`),
			compressedImage
		);

		res.sendStatus(200);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err });
	}
});

module.exports = usersRouter;
