const express = require('express');
const router = express.Router();
const SiteSettings = require('../models/SiteSettings');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get site settings (public)
// @route   GET /api/settings
// @access  Public
router.get('/', async (req, res) => {
  try {
    // We expect only one row for settings
    let settings = await SiteSettings.findOne();

    // Create default if not exists
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put('/', protect, authorize('admin', 'user'), async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      await settings.update(req.body);
    }

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
