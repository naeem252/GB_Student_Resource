const fs = require('fs');
const Student = require('./../models/Student');
const path = require('path');

const excludedFields = (obj, ...fields) => {
  Object.keys(obj).map((Ob) => {
    if (fields.includes(Ob)) delete obj[Ob];
  });
  return obj;
};

exports.getClassMates = async (req, res, next) => {
  const { batch, semester, department } = req.student;
  try {
    const classMates = await Student.find({ batch, semester, department });
    res.status(200).json({
      status: 'success',
      result: classMates.length,
      data: { classMates },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', error });
  }
};

exports.getClassMate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const classMate = await Student.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        classMate,
      },
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', error });
  }
};

exports.updateMe = async (req, res, next) => {
  const { _id } = req.student;
  const filterObject = excludedFields(req.body, 'password');
  if (req.file) {
    if (req.student.image !== 'default-avatar.jpg') {
      console.log(path.join(__dirname, '..', 'public', 'images', 'studentImages', req.student.image));
      fs.unlink(path.join(__dirname, '..', 'public', 'images', 'studentImages', req.student.image), (err) => {
        if (err) throw new Error('invalid images path');
      });
    }

    filterObject.image = req.file.filename;
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(_id, filterObject, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: 'success', student: updatedStudent });
  } catch (error) {
    res.status(404).json({ status: 'fail', error });
  }
};

exports.me = async (req, res, next) => {
  const { _id } = req.student;
  try {
    const me = await Student.findById(_id).populate({ path: 'resources', select: '-student pdf size createdAt' });
    res.status(200).json({ status: 'success', data: { me } });
  } catch (error) {
    res.status(404).json({ status: 'fail', error });
  }
};

exports.getStudentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.status(200).json({ status: 'success', student });
  } catch (error) {
    res.status(404).json({ status: 'fail', error });
  }
};
