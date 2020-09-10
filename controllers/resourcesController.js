const Resources = require('./../models/Resources');
const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'resources'));
  },
  filename: function (req, file, cb) {
    req.body.pdf = `${Date.now()}-${file.originalname}`;
    cb(null, req.body.pdf);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true);
  } else {
    cb(new Error('this is not a pdf!please send a pdf'), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadPdfResource = upload.single('pdf');

exports.getAllResources = async (req, res, next) => {
  const filterObj = {};

  if (req.student) {
    const { department, semester } = req.student;
    filterObj.department = department;
    filterObj.semester = semester;
  }

  try {
    const allResources = await Resources.find(filterObj);
    res.status(200).json({
      status: 'success',
      result: allResources.length,
      resources: allResources,
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.createResource = async (req, res, next) => {
  req.body.student = req.student._id;
  req.body.semester = req.body.semester || req.student.semester;
  req.body.department = req.body.department || req.student.department;
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'required a pdf file!' });
  }
  req.body.size = (req.file.size / 1024 / 1024).toFixed(2);

  try {
    const newResource = await Resources.create(req.body);
    res.status(200).json({ status: 'success', data: { resource: newResource } });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.updateResource = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await Resources.findById(id);
    if (resource.student._id.toString() !== req.student._id.toString()) {
      return res.status(400).json({ status: 'unathorize', message: 'you are not permit to access this action' });
    }
    const updateResource = await Resources.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: 'update successfully', data: { resource: updateResource } });
  } catch (error) {
    res.status(400).json({ status: 'llfail', message: error });
  }
};

exports.updateDownload = async (req, res, next) => {
  try {
    let resource = await Resources.findById(req.params.id);
    resource.download++;
    await resource.save();
    res.json({ status: 'success' });
  } catch (error) {
    res.status(400).json({ status: 'fail' });
  }
};
exports.downloadResource = async (req, res, next) => {
  try {
    res.redirect(`public/resources/${req.params.pdfName}`);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllByStudentId = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const studentUploadedResources = await Resources.find({ student: studentId });
    res.status(200).json({ status: 'success', studentUploadedResources });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'something went wrong' });
  }
};
