const weekRouter = require('express').Router();
const User = require('../models/user.js');
const Week = require('../models/week.js');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');
const week = require('../models/week.js');

//get week id
weekRouter.get('/activeWeekId', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);
		res.status(200).json({ id: user.activeWeek });
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

//get week tasks
weekRouter.get('/activeWeekTasks', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);
		const activeWeekId = user.activeWeek;
		if (activeWeekId) {
			const week = await Week.findById(activeWeekId).populate(
				'tasks',
				'title description priority progress id'
			);
			return res.status(200).json({ tasks: week.tasks, weekDue: week.endDate });
		} else {
			return res.status(200).json({ tasks: [], weekDue: null });
		}
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

weekRouter.get('/activeWeekNotes', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);
		const activeWeekId = user.activeWeek;
		if (activeWeekId) {
			const week = await Week.findById(activeWeekId).populate(
				'tasks',
				'title description priority progress id'
			);
			return res.status(200).json({ notes: week.notes });
		} else {
			return res.sendStatus(204);
		}
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

weekRouter.get('/getLastMonthWeeks', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		await week
			.find({ user: user._id })
			.sort({ endDate: -1 }) // Sort in descending order (latest date first)
			.limit(4)
			.populate('tasks', 'progress priority')
			.exec((err, documents) => {
				if (err) {
					return res.status(500).json({ error: err });
				} else {
					return res.status(200).json({ weeks: documents.reverse() });
				}
			});
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

weekRouter.put('/updateNotes', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const activeWeek = user.activeWeek;
		if (activeWeek) {
			const week = await Week.findById(activeWeek);

			week.notes = req.body.text;

			week.save();

			return res.status(200).json({
				notes: week.notes,
			});
		}
		return res.status(406).json({ error: 'no current week' });
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

weekRouter.post('/concludeWeek', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		user.set('activeWeek', null);
		await user.save();

		res.sendStatus(200);
	} catch (err) {
		return res.status(500).json({ error: err });
	}
});

module.exports = weekRouter;
