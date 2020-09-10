const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  cr: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'cr is required'],
    ref: 'Student',
  },
  heading: {
    type: String,
    required: [true, 'notice heading is required'],
  },
  text: {
    type: String,
    required: [true, 'notice text is required'],
  },
  department: {
    type: String,
    required: [true, 'department is requird'],
  },
  semester: {
    type: Number,
    required: [true, 'semester is required'],
  },
  batch: {
    type: Number,
    required: [true, 'batch is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

noticeSchema.pre(/^find/, function (next) {
  this.populate({ path: 'cr', select: 'image name' });
  next();
});

module.exports = mongoose.model('Notice', noticeSchema);
