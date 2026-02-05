const serverMessage = require("../utils/serverMessage");
const { subscribeToJobAlerts, unsubscribeFromJobAlerts } = require("../services/jobAlertService");

// @desc    Subscribe to job alerts
// @route   POST /api/job-alerts/subscribe
// @access  Public
exports.subscribeToAlerts = async (req, res) => {
  try {
    const { email, categories, contractTypes, remoteTypes } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: "EMAIL_REQUIRED",
      });
    }

    const result = await subscribeToJobAlerts({
      email,
      categories: categories || [],
      contractTypes: contractTypes || [],
      remoteTypes: remoteTypes || [],
    });

    return res.status(201).json({
      error: false,
      status: 201,
      message: "ALERT_SUBSCRIPTION_CREATED",
      data: result,
    });
  } catch (error) {
    console.error("Subscribe to alerts error:", error);
    return res.status(500).json({
      error: true,
      message: "ALERT_SUBSCRIPTION_ERROR",
    });
  }
};

// @desc    Unsubscribe from job alerts
// @route   POST /api/job-alerts/unsubscribe
// @access  Public
exports.unsubscribeFromAlerts = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: true,
        message: "EMAIL_REQUIRED",
      });
    }

    await unsubscribeFromJobAlerts(email);

    return res.status(200).json({
      error: false,
      status: 200,
      message: "ALERT_UNSUBSCRIBED",
    });
  } catch (error) {
    console.error("Unsubscribe from alerts error:", error);
    return res.status(500).json({
      error: true,
      message: "ALERT_UNSUBSCRIBE_ERROR",
    });
  }
};

// @desc    Get all alert subscriptions (admin)
// @route   GET /api/job-alerts
// @access  Private (Admin)
exports.getAlertSubscriptions = async (req, res) => {
  try {
    const SpontaneousApplication = require("../models/SpontaneousApplication");
    const Application = require("../models/Application");

    // Get all subscribed users
    const [spontaneous, regular] = await Promise.all([
      SpontaneousApplication.findAll({
        where: { subscribeToAlerts: true },
        attributes: ['id', 'email', 'firstName', 'lastName', 'desiredCategories', 'desiredContractTypes', 'desiredRemoteTypes', 'createdAt'],
        order: [['createdAt', 'DESC']],
      }),
      Application.findAll({
        where: { subscribeToAlerts: true },
        attributes: ['id', 'email', 'firstName', 'lastName', 'alertPreferences', 'createdAt'],
        group: ['id', 'email', 'firstName', 'lastName', 'alertPreferences', 'createdAt'],
        order: [['createdAt', 'DESC']],
      }),
    ]);

    const subscriptions = [
      ...spontaneous.map(s => ({
        ...s.toJSON(),
        type: 'spontaneous',
      })),
      ...regular.map(r => ({
        ...r.toJSON(),
        type: 'regular',
      })),
    ];

    return res.status(200).json({
      error: false,
      status: 200,
      message: "GET_ALERT_SUBSCRIPTIONS_SUCCESS",
      data: subscriptions,
    });
  } catch (error) {
    console.error("Get alert subscriptions error:", error);
    return res.status(500).json({
      error: true,
      message: "GET_ALERT_SUBSCRIPTIONS_ERROR",
    });
  }
};
