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

		//id is current weeks id
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
		return res.status(500).json({ error: err });
	}
});

//delete
taskRouter.delete('/deleteTask', async (req, res) => {
	try {
		const token = req.token;
		const decodedToken = jwt.verify(token, config.SECRET);
		const user = await User.findById(decodedToken.id);

		const week = await Week.findById(user.activeWeek);

		/*on scalabaility of instance.array.pull ->
		that wouldn't be very scalable. You could have collisions of instances, if more than one of the same call were fired at the same time.*/

		await week.tasks.pull(req.body.taskId);
		await task.findByIdAndRemove(req.body.taskId);

		return res.status(200).json({ deletedTaskId: req.body.taskId });
	} catch (err) {
		console.log('task router', err);
		return res.status(500).json({ error: err });
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
		return res.status(500).json({ error: err });
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
		return res.status(500).json({ error: err });
	}
});

module.exports = taskRouter;

/*
Refactor the code to eliminate repetitive code and keep it more organized. For example, you can create a function to handle the common logic of handling token verification and returning errors, and use it in each route.

Use a more descriptive error message instead of just 'task router' in the catch block to make it easier to diagnose errors.

Use consistent naming conventions throughout the code.

Use a more descriptive variable name instead of task to avoid confusion with the imported Task model.

Consider using a try-catch block when calling jwt.verify to catch any potential errors that could occur when decoding the token.

Consider using the findOneAndUpdate method instead of first finding the task and then saving it. This would reduce the number of queries made to the database and improve performance.

Use a more descriptive HTTP status code instead of 200 for successful operations. For example, 201 for the addTask route and 204 for the deleteTask route.

Consider using a logger to log messages and errors instead of using console.log statements.
*/
