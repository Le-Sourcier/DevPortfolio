const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  updateJobStatus,
} = require('../controllers/jobController');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getContractTypes,
  createContractType,
  updateContractType,
  deleteContractType,
  getRemoteTypes,
  createRemoteType,
  updateRemoteType,
  deleteRemoteType,
  getAllMetadata,
} = require('../controllers/jobMetadataController');
const { protect } = require('../middleware/authMiddleware');

// Metadata routes (public GET, protected CUD)
router.get('/metadata', getAllMetadata);

// Categories
router.route('/categories')
  .get(getCategories)
  .post(protect, createCategory);

router.route('/categories/:id')
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

// Contract Types
router.route('/contract-types')
  .get(getContractTypes)
  .post(protect, createContractType);

router.route('/contract-types/:id')
  .put(protect, updateContractType)
  .delete(protect, deleteContractType);

// Remote Types
router.route('/remote-types')
  .get(getRemoteTypes)
  .post(protect, createRemoteType);

router.route('/remote-types/:id')
  .put(protect, updateRemoteType)
  .delete(protect, deleteRemoteType);

// Jobs routes
router.route('/')
  .get(getJobs)
  .post(protect, createJob);

router.route('/:id')
  .get(getJob)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

router.route('/:id/status')
  .patch(protect, updateJobStatus);

module.exports = router;
