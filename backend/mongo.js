require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Week = require('./models/week');
const Task = require('./models/task');

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log('connected to', process.env.MONGODB_URI);
	// Week.find({}).then((result) => console.log('weeks', result));
	// Task.find({}).then((result) => console.log('tasks', result));
	const setBaseAvatar = async () => {
		const user = await User.find({});
		// user.set('avatarId', undefined, { strict: false });
		// await user.save();
		// const xd = await User.findOne({});
		console.log(user);
	};
	setBaseAvatar();
	// const setactiveWeekToNull = async () => {
	// 	const user = await User.findOne({});
	// 	user.set('activeWeek', null);
	// 	await user.save();
	// };
	// setactiveWeekToNull();
});

// Week.find({}).then((result) => console.log('weeks', result));
// Task.find({}).then((result) => console.log('tasks', result));

// User.deleteMany({}).then((result) => console.log(result));
