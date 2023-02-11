const weekRouter = require('express').Router();
const User = require('../models/user.js');
const Week = require('../models/week.js');
const Task = require('../models/task.js');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');

//get week id
weekRouter.get('/activeWeekId', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);
		const activeWeek = user.activeWeek;
		res.status(200).json({ id: activeWeek });
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

//initiate a new week
weekRouter.post('/initiateNewWeek', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const currentDate = new Date();
		const endDate = new Date(currentDate);
		endDate.setDate(endDate.getDate() + 7);
		const week = new Week({
			startDate: currentDate,
			endDate: endDate,
			user: user._id,
			tasks: [],
		});
		const savedWeek = await week.save();

		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			priority: req.body.priority,
			progress: req.body.progress,
			week: savedWeek._id,
		});
		const savedTask = await task.save();

		savedWeek.tasks = savedWeek.tasks.concat(savedTask._id);
		const updatedWeek = await savedWeek.save();
		user.activeWeek = updatedWeek._id;
		await user.save();
		res.status(200).json({
			title: savedTask.title,
			description: savedTask.description,
			priority: savedTask.priority,
			progress: savedTask.progress,
			id: savedTask._id,
		});
	} catch (err) {
		return res.status(500).json({ erro: err });
	}
});

weekRouter.put('/updateNotes', async (req, res) => {
	const token = req.token;
	try {
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const week = await Week.findById(user.activeWeek);

		week.notes = req.body.text;

		week.save();

		res.status(200).json({
			notes: week.notes,
		});
	} catch (err) {
		console.log('week router', err);
		return res.status(500).json({ erro: err });
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
		console.error(err);
		return res.status(500).json({ erro: err });
	}
});

module.exports = weekRouter;
