const router = require('express').Router();
const authController = require('./../controllers/authController');
const studentController = require('./../controllers/studentController');

/*
==========
SIGNUP STUDEN
==========
*/
router.post('/signup', authController.signup);
/*
==========
LOGIN STUDEN
==========
*/
router.post('/login', authController.login);
/*
==========
LOGOUT STUDEN
==========
*/
router.get('/logout', authController.logout);
/*
==========
GET STUDENT BY ID
==========
*/
router.get('/:id', studentController.getStudentById);
/*
==========
EVERY ROUTE IS PROTECTED
==========
*/
router.use(authController.protect);
/*
==========
UPLOAD STUDENT IMAGE
==========
*/
router.patch(
  '/upload-student-image',
  authController.uploadStudentPhoto,
  authController.resizeStudentPhoto,
  studentController.updateMe
);

/*
==========
UPDATE MY PROFILE
==========
*/
router.patch('/updateMe', studentController.updateMe);
/*
==========
GET MY PROFILE
==========
*/
router.get('/me', studentController.me);
/*
==========
GET ALL CLASSMATES
==========
*/
router.get('/class-mates', studentController.getClassMates);
/*
==========
GET SINGLE CLASSMATE
==========
*/
router.get('/class-mates/:id', studentController.getClassMate);
module.exports = router;
