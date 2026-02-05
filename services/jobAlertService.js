const Application = require('../models/Application');
const SpontaneousApplication = require('../models/SpontaneousApplication');
const Job = require('../models/Job');
const { sendJobAlert } = require('../utils/emailService');
const { Op } = require('sequelize');

/**
 * Send job alerts to matching candidates when a new job is published
 * @param {Object} job - The newly published job
 */
exports.sendAlertsForNewJob = async (job) => {
  try {
    console.log(`🔔 Checking candidates for job: ${job.title.fr}`);

    // Find all candidates who subscribed to alerts
    const [regularApplications, spontaneousApplications] = await Promise.all([
      // Regular applications with alert subscription
      Application.findAll({
        where: {
          subscribeToAlerts: true,
        },
        attributes: ['email', 'firstName', 'alertPreferences'],
        group: ['email', 'firstName', 'alertPreferences'],
      }),
      // Spontaneous applications with alert subscription
      SpontaneousApplication.findAll({
        where: {
          subscribeToAlerts: true,
          sentAlertJobIds: {
            [Op.notLike]: `%${job.id}%`, // Don't send if already sent
          },
        },
        attributes: ['id', 'email', 'firstName', 'desiredCategories', 'desiredContractTypes', 'desiredRemoteTypes', 'sentAlertJobIds'],
      }),
    ]);

    // Process regular applications
    const regularCandidates = regularApplications.filter(app => {
      const prefs = app.alertPreferences || {};

      // If no preferences, send to all
      if (!prefs.categories && !prefs.contractTypes && !prefs.remoteTypes) {
        return true;
      }

      // Check if job matches preferences
      const matchesCategory = !prefs.categories || prefs.categories.length === 0 || prefs.categories.includes(job.category);
      const matchesContract = !prefs.contractTypes || prefs.contractTypes.length === 0 || prefs.contractTypes.includes(job.contractType);
      const matchesRemote = !prefs.remoteTypes || prefs.remoteTypes.length === 0 || prefs.remoteTypes.includes(job.remoteType);

      return matchesCategory && matchesContract && matchesRemote;
    });

    // Process spontaneous applications
    const spontaneousCandidates = spontaneousApplications.filter(app => {
      // If no preferences, send to all
      if (app.desiredCategories.length === 0 && app.desiredContractTypes.length === 0 && app.desiredRemoteTypes.length === 0) {
        return true;
      }

      // Check if job matches preferences
      const matchesCategory = app.desiredCategories.length === 0 || app.desiredCategories.includes(job.category);
      const matchesContract = app.desiredContractTypes.length === 0 || app.desiredContractTypes.includes(job.contractType);
      const matchesRemote = app.desiredRemoteTypes.length === 0 || app.desiredRemoteTypes.includes(job.remoteType);

      return matchesCategory && matchesContract && matchesRemote;
    });

    // Send emails
    const emailPromises = [];

    // Send to regular candidates
    for (const candidate of regularCandidates) {
      emailPromises.push(
        sendJobAlert(candidate.email, [job], candidate.firstName)
          .catch(err => console.error(`Failed to send alert to ${candidate.email}:`, err))
      );
    }

    // Send to spontaneous candidates and update their sentAlertJobIds
    for (const candidate of spontaneousCandidates) {
      emailPromises.push(
        sendJobAlert(candidate.email, [job], candidate.firstName)
          .then(async () => {
            // Mark this job as sent to avoid duplicates
            const updatedJobIds = [...(candidate.sentAlertJobIds || []), job.id];
            await SpontaneousApplication.update(
              { sentAlertJobIds: updatedJobIds },
              { where: { id: candidate.id } }
            );
          })
          .catch(err => console.error(`Failed to send alert to ${candidate.email}:`, err))
      );
    }

    await Promise.all(emailPromises);

    const totalSent = regularCandidates.length + spontaneousCandidates.length;
    console.log(`✅ Sent ${totalSent} job alerts for: ${job.title.fr}`);

    return {
      success: true,
      alertsSent: totalSent,
      breakdown: {
        regularApplications: regularCandidates.length,
        spontaneousApplications: spontaneousCandidates.length,
      },
    };
  } catch (error) {
    console.error('❌ Error sending job alerts:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Create or update a job alert subscription
 * @param {Object} data - Subscription data
 */
exports.subscribeToJobAlerts = async (data) => {
  const { email, categories = [], contractTypes = [], remoteTypes = [] } = data;

  try {
    // Check if email already exists in spontaneous applications
    let subscription = await SpontaneousApplication.findOne({
      where: { email },
    });

    if (subscription) {
      // Update existing subscription preferences
      await subscription.update({
        desiredCategories: categories,
        desiredContractTypes: contractTypes,
        desiredRemoteTypes: remoteTypes,
        subscribeToAlerts: true,
      });
      return { success: true, updated: true };
    } else {
      // Create new alert-only subscription (minimal data)
      await SpontaneousApplication.create({
        email,
        firstName: email.split('@')[0], // Temporary name
        lastName: 'Alert Subscriber',
        phone: 'N/A',
        desiredPosition: 'Multiple positions',
        message: 'Job alert subscription only',
        desiredCategories: categories,
        desiredContractTypes: contractTypes,
        desiredRemoteTypes: remoteTypes,
        subscribeToAlerts: true,
        status: 'alert_only', // Special status for alert-only subs
        cvUrl: 'N/A',
      });
      return { success: true, created: true };
    }
  } catch (error) {
    console.error('Error subscribing to job alerts:', error);
    throw error;
  }
};

/**
 * Unsubscribe from job alerts
 * @param {string} email - Email to unsubscribe
 */
exports.unsubscribeFromJobAlerts = async (email) => {
  try {
    // Unsubscribe from all applications
    await Promise.all([
      Application.update(
        { subscribeToAlerts: false },
        { where: { email } }
      ),
      SpontaneousApplication.update(
        { subscribeToAlerts: false },
        { where: { email } }
      ),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error unsubscribing from job alerts:', error);
    throw error;
  }
};
