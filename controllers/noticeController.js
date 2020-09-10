const Notice = require('./../models/Notice');

exports.postNotice = async (req, res, next) => {
  req.body.department = req.student.department;
  req.body.batch = req.student.batch;
  req.body.semester = req.student.semester;
  req.body.cr = req.student._id;

  try {
    if (!req.student.CR) {
      return res.status(400).json({ status: 'success', message: 'this route only for CR' });
    }
    const notice = await Notice.create(req.body);
    res.status(200).json({ status: 'success', data: { notice } });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllNotice = async (req, res, next) => {
  try {
    const allNotice = await Notice.find({
      department: req.student.department,
      batch: req.student.batch,
      semester: req.student.semester,
    });
    res.status(200).json({ status: 'success', result: allNotice.length, notices: allNotice });
  } catch (error) {
    res.status(400).json({ error });
  }
};
