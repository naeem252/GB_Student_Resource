const router = require('express').Router();
const authController = require('./../controllers/authController');
const noticeController = require('./../controllers/noticeController');

router.use(authController.protect);

/*
==========
POST A NOTICE
==========
*/
router.post('/', noticeController.postNotice);

/*
==========
FIND ALL NOTICE BY LOGIN STUDENT
==========
*/
router.get('/all-notice', noticeController.getAllNotice);
module.exports = router;
