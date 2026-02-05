const NewsletterSubscriber = require('../models/NewsletterSubscriber');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Veuillez fournir un email' });
    }

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ where: { email } });

    if (existing) {
      if (!existing.isActive) {
        // Reactivate if previously unsubscribed
        existing.isActive = true;
        await existing.save();
        return res.status(200).json({ success: true, message: 'Réabonnement réussi !' });
      }
      return res.status(400).json({ success: false, error: 'Cet email est déjà inscrit' });
    }

    await NewsletterSubscriber.create({ email });

    res.status(201).json({ success: true, message: 'Inscription réussie !' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ success: true, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
