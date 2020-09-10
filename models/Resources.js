const mongoose = require('mongoose');
const resourcesSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'student id requird'],
  },
  pdf: {
    type: String,
    required: [true, 'pdf file is required'],
  },
  department: {
    type: String,
    required: [true, 'department is requird'],
    uppercase: true,
  },
  semester: {
    type: Number,
    required: [true, 'semester is requird'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  courseCode: {
    type: String,
    required: [true, 'course code is required'],
  },
  size: {
    type: Number,
    required: [true, 'size is required'],
    max: [100, 'file is too large'],
  },
  download: {
    type: Number,
    default: 0,
  },
});

/*
==========
POPULATE STUDENT WHEN FIND ROSOURCE
==========
*/
resourcesSchema.pre(/^find/, function (next) {
  this.populate({ path: 'student', select: 'name image _id' });
  next();
});

module.exports = mongoose.model('Resources', resourcesSchema);
