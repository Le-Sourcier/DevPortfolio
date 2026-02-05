const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/subscribe', subscribe);
router.get('/', protect, authorize('admin', 'user'), getSubscribers);

module.exports = router;
