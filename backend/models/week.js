const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
	startDate: Date,
	endDate: Date,
	notes: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

weekSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Week', weekSchema);
