const express = require('express');
const router = express.Router();
const {
  createApplication,
  getApplications,
  getApplication,
  updateApplicationStatus,
  deleteApplication,
  createSpontaneousApplication,
  getSpontaneousApplications,
  getSpontaneousApplication,
  updateSpontaneousApplicationStatus,
  deleteSpontaneousApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { uploadApplicationFiles, handleUploadError } = require('../middleware/uploadMiddleware');

// Spontaneous Applications - MUST BE BEFORE /:id to avoid route conflicts
router.route('/spontaneous')
  .post(uploadApplicationFiles, handleUploadError, createSpontaneousApplication) // Public
  .get(protect, getSpontaneousApplications); // Admin only

router.route('/spontaneous/:id')
  .get(protect, getSpontaneousApplication)
  .delete(protect, deleteSpontaneousApplication);

router.route('/spontaneous/:id/status')
  .patch(protect, updateSpontaneousApplicationStatus);

// Regular Applications
router.route('/')
  .post(uploadApplicationFiles, handleUploadError, createApplication) // Public - anyone can apply
  .get(protect, getApplications); // Admin only

router.route('/:id')
  .get(protect, getApplication)
  .delete(protect, deleteApplication);

router.route('/:id/status')
  .patch(protect, updateApplicationStatus);

module.exports = router;
