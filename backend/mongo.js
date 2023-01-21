require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Week = require("./models/week");
const Task = require("./models/task");

console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("connected to", process.env.MONGODB_URI));

Week.deleteMany({}).then((result) => console.log("weeks", result));
Task.deleteMany({}).then((result) => console.log("tasks", result));

// Week.find({}).then((result) => console.log('weeks', result));
// Task.find({}).then((result) => console.log('tasks', result));
// User.find({}).then((result) => console.log('users', result));

const setCurrentWeekToNull = async () => {
  const user = await User.findOne({});
  await user.set("currentWeek", null);
  user.save();
};
setCurrentWeekToNull();
User.findOne({}).then((result) => console.log(result));