const resourcesController = require('./../controllers/resourcesController');
const authController = require('./../controllers/authController');
const router = require('express').Router();
router
  .route('/downloadResource/:id/:pdfName')
  .patch(resourcesController.updateDownload)
  .get(resourcesController.downloadResource);
/*
==========
GET ALL RESOURCES BY STUDENT ID
==========
*/
router.get('/studentResources/:studentId', resourcesController.getAllByStudentId);
router.use(authController.protect);

router
  .route('/')
  .get(resourcesController.getAllResources)
  .post(resourcesController.uploadPdfResource, resourcesController.createResource);

router.route('/:id').patch(resourcesController.updateResource);

module.exports = router;
