const mongoose = require('mongoose');

const userSchmea = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  currentWeek: { type: mongoose.Schema.Types.ObjectId, ref: 'Week' },
  weeks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Week',
    },
  ],
});

userSchmea.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchmea);
