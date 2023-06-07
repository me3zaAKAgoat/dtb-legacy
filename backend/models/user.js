const mongoose = require('mongoose');
const { stringify } = require('uuid');
const { v4: uuidv4 } = require('uuid');

const generateUniqueUserId = () => {
	let userId = uuidv4();

	// Check if the generated userId is already taken
	while (!isUserIdUnique(userId)) {
		userId = uuidv4();
	}

	return userId;
};

const isUserIdUnique = async (userId) => {
	const User = mongoose.model('User');
	const existingUser = await User.findOne({ userId });
	return !existingUser;
};

const userSchema = mongoose.Schema({
	userId: { type: String, unique: true },
	username: String,
	name: String,
	passwordHash: String,
	activeWeek: { type: mongoose.Schema.Types.ObjectId, ref: 'Week' },
	weeks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Week',
		},
	],
});

userSchema.pre('save', function (next) {
	if (!this.userId) {
		this.userId = generateUniqueUserId(); // Replace generateUniqueId with your own unique ID generation logic
	}
	next();
});

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model('User', userSchema);
