const avatarsRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

avatarsRouter.get('/:id.jpeg', async (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	const filePath = path.join(__dirname, `../avatars/${id}.jpeg`);

	fs.access(filePath, fs.constants.F_OK, (err) => {
		console.log(err);
		if (err) {
			return res.sendFile(path.join(__dirname, `../avatars/default.jpeg`));
		}
		return res.sendFile(filePath);
	});
});

module.exports = avatarsRouter;
