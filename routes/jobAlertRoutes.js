const express = require('express');
const router = express.Router();
const {
  subscribeToAlerts,
  unsubscribeFromAlerts,
  getAlertSubscriptions,
} = require('../controllers/jobAlertController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/subscribe', subscribeToAlerts);
router.post('/unsubscribe', unsubscribeFromAlerts);

// Admin routes
router.get('/', protect, getAlertSubscriptions);

module.exports = router;
