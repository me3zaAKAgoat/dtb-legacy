const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  progress: Number,
  week: { type: mongoose.Schema.Types.ObjectId, ref: 'Week' },
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Task', taskSchema);
