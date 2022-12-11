const taskRouter = require('express').Router();
const User = require('../models/user.js');
const Week = require('../models/week.js');
const Task = require('../models/task.js');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');

//add a task
taskRouter.post('/addTask/:id', async (req, res) => {
	try {
		const token = req.token;
		jwt.verify(token, config.SECRET);

		const week = await Week.findById(req.params.id);

		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			priority: req.body.priority,
			progress: req.body.progress,
			week: week._id,
		});
		const savedTask = await task.save();

		week.tasks = week.tasks.concat(savedTask._id);
		await week.save();
		return res.status(200).json({
			title: savedTask.title,
			description: savedTask.description,
			priority: savedTask.priority,
			progress: savedTask.progress,
			id: savedTask._id,
		});
	} catch (err) {
		console.log('task router', err);
		return res.status(500).json({ erro: err });
	}
});

//edit task
taskRouter.put('/editTask', async (req, res) => {
	try {
		const token = req.token;
		jwt.verify(token, config.SECRET);

		const task = await Task.findById(req.body.id);

		task.title = req.body.title;
		task.description = req.body.description;
		task.priority = req.body.priority;

		const savedTask = await task.save();

		return res.status(200).json({
			title: savedTask.title,
			description: savedTask.description,
			priority: savedTask.priority,
			progress: savedTask.progress,
			id: savedTask._id,
		});
	} catch (err) {
		console.log('task router', err);
		return res.status(500).json({ erro: err });
	}
});

//edit task
taskRouter.put('/changeProgress', async (req, res) => {
	try {
		const token = req.token;
		jwt.verify(token, config.SECRET);

		const task = await Task.findById(req.body.id);

		task.progress = req.body.progress;

		const savedTask = await task.save();

		return res.status(200).json({
			title: savedTask.title,
			description: savedTask.description,
			priority: savedTask.priority,
			progress: savedTask.progress,
			id: savedTask._id,
		});
	} catch (err) {
		console.log('task router', err);
		return res.status(500).json({ erro: err });
	}
});

module.exports = taskRouter;
