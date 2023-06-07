const PPRouter = require('express').Router();
const fs = require('fs');

PPRouter.get('/:id.jpeg', async (req, res) => {
	const { id } = req.params;
	console.log(req.params);
	const filePath = `/home/me3za/dtb/avatars/${id}.jpeg`;

	fs.access(filePath, fs.constants.F_OK, (err) => {
		console.log(err);
		if (err) {
			return res.sendFile(`/home/me3za/dtb/avatars/default.jpeg`);
		}
		return res.sendFile(filePath);
	});
});

module.exports = PPRouter;
