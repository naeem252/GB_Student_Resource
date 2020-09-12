const { promisify } = require('util');
const Student = require('./../models/Student');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const Email = require('../util/Email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (student, res) => {
  const token = signToken(student._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  student.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    student,
  });
};

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('this is not an images!please send an image'), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadStudentPhoto = upload.single('image');
exports.resizeStudentPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `student-${req.student._id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/studentImages/${req.file.filename}`);
  next();
};
exports.signup = async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);

    createAndSendToken(student, res);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'invalid email or password' });
  }
  try {
    let student = await Student.findOne({ email });

    if (!student || !(await student.isPasswordCorrect(password, student.password))) {
      return res.status(400).json({ status: 'fail', message: 'invalid email or password' });
    }
    createAndSendToken(student, res);
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    const error = new Error();
    error.message = 'you are not permit to get access';
    return next(error);
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentStudent = await Student.findById(decoded.id);
    if (!currentStudent) {
      const error = new Error();
      error.message = 'the student does not belongig to this token';
      return next(error);
    }

    if (currentStudent.passwordChangedAfter(decoded.iat)) {
      const error = new Error();
      error.message = 'Student recently changed password! Please log in again';
      return next(error);
    }

    req.student = currentStudent;
    next();
  } catch (error) {
    next(error);
  }
};
exports.logout = (req, res, next) => {
  res.cookie('jwt', 'jwt', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
  res.json({ status: 'success' });
};

exports.forgotPassword = async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return res.status(400).json({ status: 'fail', message: 'Email Address is wrong!' });
  }
  const resetToken = student.createPassResetToken();
  await student.save({ validateBeforeSave: false });

  try {
    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    // const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
    await new Email(student, resetUrl).passwordReset();
    res.status(200).json({ status: 'success', message: 'check email for reset password' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'send email fail', error });
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const student = await Student.findOne({ passResetToken: hashToken, passResetTokenExp: { $gt: Date.now() } });
  if (!student) {
    return res.status(400).json({ status: 'fail', message: 'token has been expired please try again' });
  }
  try {
    student.password = req.body.password;
    student.passwordConfirm = req.body.passwordConfirm;
    student.passResetToken = undefined;
    student.passResetTokenExp = undefined;
    await student.save();
    createAndSendToken(student, res);
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
