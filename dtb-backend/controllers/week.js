const weekRouter = require('express').Router();
const User = require('../models/user.js');
const Week = require('../models/week.js');
const Task = require('../models/task.js');
const jwt = require('jsonwebtoken');
const config = require('../utils/config.js');

//get week id
weekRouter.get('/currentWeekId', async (req, res) => {
  const token = req.token;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    const currentWeek = user.currentWeek;
    res.status(200).json({ currentWeek: currentWeek });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//get week tasks
weekRouter.get('/currentWeekData', async (req, res) => {
  const token = req.token;
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    const currentWeekId = user.currentWeek;
    if (currentWeekId) {
      const week = await Week.findById(currentWeekId).populate(
        'tasks',
        'title description priority progress id'
      );
      return res.status(200).json({ tasks: week.tasks, weekDue: week.endDate });
    } else {
      return res.status(200).json({ tasks: [], weekDue: null });
    }
  } catch (err) {
    console.log('WeekRouter', err);
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
    user.currentWeek = updatedWeek._id;
    await user.save();
    res.status(200).json({
      title: savedTask.title,
      description: savedTask.description,
      priority: savedTask.priority,
      progress: savedTask.progress,
      id: savedTask._id,
    });
  } catch (err) {
    console.log('week router', err);
    return res.status(500).json({ erro: err });
  }
});

module.exports = weekRouter;
