const Application = require("../models/Application");
const SpontaneousApplication = require("../models/SpontaneousApplication");
const Job = require("../models/Job");
const serverMessage = require("../utils/serverMessage");
const { sendApplicationConfirmation, sendApplicationNotificationToAdmin, sendStatusUpdateEmail } = require("../utils/emailService");

// ==================== APPLICATIONS ====================

// @desc    Create a new application
// @route   POST /api/applications
// @access  Public
exports.createApplication = async (req, res) => {
  try {
    // Get file URLs from uploaded files
    const cvUrl = req.files?.cv ? `/uploads/cv/${req.files.cv[0].filename}` : req.body.cvUrl;
    const coverLetterUrl = req.files?.coverLetter ? `/uploads/cover-letters/${req.files.coverLetter[0].filename}` : req.body.coverLetterUrl;

    const {
      jobId,
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      yearsOfExperience,
      currentPosition,
      expectedSalary,
      availabilityDate,
      message,
      subscribeToAlerts,
      alertPreferences,
    } = req.body;

    // Validate CV
    if (!cvUrl) {
      return res.status(400).json({
        error: true,
        message: "CV_REQUIRED",
      });
    }

    // Convert empty strings to null for numeric fields
    if (yearsOfExperience === '' || yearsOfExperience === undefined) {
      yearsOfExperience = null;
    } else {
      yearsOfExperience = parseInt(yearsOfExperience);
    }

    // Validate job exists
    const job = await Job.findByPk(jobId);
    if (!job) {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    // Check if user already applied to this job
    const existingApplication = await Application.findOne({
      where: {
        jobId,
        email,
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: "ALREADY_APPLIED",
        details: "Vous avez déjà postulé à cette offre",
      });
    }

    // Create application
    const application = await Application.create({
      jobId,
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      cvUrl,
      coverLetterUrl,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      yearsOfExperience,
      currentPosition,
      expectedSalary,
      availabilityDate,
      message,
      subscribeToAlerts,
      alertPreferences: alertPreferences || {},
      status: "pending",
    });

    // Increment applications count for the job
    await job.update({
      applicationsCount: (job.applicationsCount || 0) + 1,
    });

    // Send confirmation email to candidate
    try {
      await sendApplicationConfirmation(
        email,
        firstName,
        job.title.fr || job.title.en
      );
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the application if email fails
    }

    // Send notification email to admin
    try {
      await sendApplicationNotificationToAdmin({
        candidateName: `${firstName} ${lastName}`,
        jobTitle: job.title.fr || job.title.en,
        email,
        phone,
        applicationId: application.id,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
    }

    const response = serverMessage(res, "APPLICATION_CREATED", application);
    return response;
  } catch (error) {
    console.error("Create application error:", error);
    const response = serverMessage(res, "APPLICATION_CREATE_ERROR");
    return response;
  }
};

// @desc    Get all applications (admin)
// @route   GET /api/applications
// @access  Private (Admin)
exports.getApplications = async (req, res) => {
  try {
    const { jobId, status } = req.query;

    const where = {};
    if (jobId) where.jobId = jobId;
    if (status) where.status = status;

    const applications = await Application.findAll({
      where,
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "category", "location"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const response = serverMessage(res, "GET_ALL_APPLICATIONS_SUCCESS", applications);
    return response;
  } catch (error) {
    console.error("Get applications error:", error);
    const response = serverMessage(res, "GET_ALL_APPLICATIONS_ERROR");
    return response;
  }
};

// @desc    Get single application (admin)
// @route   GET /api/applications/:id
// @access  Private (Admin)
exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        {
          model: Job,
          as: "job",
        },
      ],
    });

    if (!application) {
      const response = serverMessage(res, "APPLICATION_NOT_FOUND");
      return response;
    }

    const response = serverMessage(res, "GET_APPLICATION_SUCCESS", application);
    return response;
  } catch (error) {
    console.error("Get application error:", error);
    const response = serverMessage(res, "GET_APPLICATION_ERROR");
    return response;
  }
};

// @desc    Update application status (admin)
// @route   PATCH /api/applications/:id/status
// @access  Private (Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes, interviewDetails } = req.body;

    const application = await Application.findByPk(req.params.id, {
      include: [{
        model: Job,
        as: "job",
      }],
    });

    if (!application) {
      const response = serverMessage(res, "APPLICATION_NOT_FOUND");
      return response;
    }

    const previousStatus = application.status;

    await application.update({
      status,
      ...(adminNotes && { adminNotes }),
    });

    // Send status update email to candidate if status changed
    if (status !== previousStatus && ['reviewing', 'shortlisted', 'interview', 'accepted', 'rejected'].includes(status)) {
      try {
        const jobTitle = application.job?.title?.fr || application.job?.title?.en || 'le poste';
        await sendStatusUpdateEmail(
          application.email,
          application.firstName,
          jobTitle,
          status,
          interviewDetails || null
        );
        console.log(`✅ Status update email sent to ${application.email} (${status})`);
      } catch (emailError) {
        console.error("Failed to send status update email:", emailError);
        // Don't fail the status update if email fails
      }
    }

    const response = serverMessage(res, "APPLICATION_STATUS_UPDATED", application);
    return response;
  } catch (error) {
    console.error("Update application status error:", error);
    const response = serverMessage(res, "APPLICATION_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete application (admin)
// @route   DELETE /api/applications/:id
// @access  Private (Admin)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByPk(req.params.id);
    if (!application) {
      const response = serverMessage(res, "APPLICATION_NOT_FOUND");
      return response;
    }

    await application.destroy();
    const response = serverMessage(res, "APPLICATION_DELETED");
    return response;
  } catch (error) {
    console.error("Delete application error:", error);
    const response = serverMessage(res, "APPLICATION_DELETE_ERROR");
    return response;
  }
};

// ==================== SPONTANEOUS APPLICATIONS ====================

// @desc    Create a spontaneous application
// @route   POST /api/applications/spontaneous
// @access  Public
exports.createSpontaneousApplication = async (req, res) => {
  try {
    // Get file URLs from uploaded files
    const cvUrl = req.files?.cv ? `/uploads/cv/${req.files.cv[0].filename}` : req.body.cvUrl;
    const coverLetterUrl = req.files?.coverLetter ? `/uploads/cover-letters/${req.files.coverLetter[0].filename}` : req.body.coverLetterUrl;

    let {
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      desiredPosition,
      desiredCategories,
      desiredContractTypes,
      desiredRemoteTypes,
      yearsOfExperience,
      currentPosition,
      expectedSalary,
      availabilityDate,
      message,
      subscribeToAlerts,
    } = req.body;

    // Parse JSON arrays if they come as strings from FormData
    if (typeof desiredCategories === 'string') {
      desiredCategories = JSON.parse(desiredCategories);
    }
    if (typeof desiredContractTypes === 'string') {
      desiredContractTypes = JSON.parse(desiredContractTypes);
    }
    if (typeof desiredRemoteTypes === 'string') {
      desiredRemoteTypes = JSON.parse(desiredRemoteTypes);
    }

    // Convert empty strings to null for numeric fields
    if (yearsOfExperience === '' || yearsOfExperience === undefined) {
      yearsOfExperience = null;
    } else {
      yearsOfExperience = parseInt(yearsOfExperience);
    }

    // Validate CV
    if (!cvUrl) {
      return res.status(400).json({
        error: true,
        message: "CV_REQUIRED",
      });
    }

    // Create spontaneous application
    const application = await SpontaneousApplication.create({
      firstName,
      lastName,
      email,
      phone,
      currentLocation,
      cvUrl,
      coverLetterUrl,
      linkedinUrl,
      portfolioUrl,
      githubUrl,
      desiredPosition,
      desiredCategories: desiredCategories || [],
      desiredContractTypes: desiredContractTypes || [],
      desiredRemoteTypes: desiredRemoteTypes || [],
      yearsOfExperience,
      currentPosition,
      expectedSalary,
      availabilityDate,
      message,
      subscribeToAlerts: subscribeToAlerts !== false, // Default true
      status: "pending",
    });

    // Send confirmation email to candidate
    try {
      await sendApplicationConfirmation(
        email,
        firstName,
        "Candidature Spontanée"
      );
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    // Send notification email to admin
    try {
      await sendApplicationNotificationToAdmin({
        candidateName: `${firstName} ${lastName}`,
        jobTitle: "Candidature Spontanée",
        email,
        phone,
        applicationId: application.id,
        isSpontaneous: true,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
    }

    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_CREATED", application);
    return response;
  } catch (error) {
    console.error("Create spontaneous application error:", error);
    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_CREATE_ERROR");
    return response;
  }
};

// @desc    Get all spontaneous applications (admin)
// @route   GET /api/applications/spontaneous
// @access  Private (Admin)
exports.getSpontaneousApplications = async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};
    if (status) where.status = status;

    const applications = await SpontaneousApplication.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    const response = serverMessage(res, "GET_ALL_SPONTANEOUS_APPLICATIONS_SUCCESS", applications);
    return response;
  } catch (error) {
    console.error("Get spontaneous applications error:", error);
    const response = serverMessage(res, "GET_ALL_SPONTANEOUS_APPLICATIONS_ERROR");
    return response;
  }
};

// @desc    Get single spontaneous application (admin)
// @route   GET /api/applications/spontaneous/:id
// @access  Private (Admin)
exports.getSpontaneousApplication = async (req, res) => {
  try {
    const application = await SpontaneousApplication.findByPk(req.params.id);

    if (!application) {
      const response = serverMessage(res, "SPONTANEOUS_APPLICATION_NOT_FOUND");
      return response;
    }

    const response = serverMessage(res, "GET_SPONTANEOUS_APPLICATION_SUCCESS", application);
    return response;
  } catch (error) {
    console.error("Get spontaneous application error:", error);
    const response = serverMessage(res, "GET_SPONTANEOUS_APPLICATION_ERROR");
    return response;
  }
};

// @desc    Update spontaneous application status (admin)
// @route   PATCH /api/applications/spontaneous/:id/status
// @access  Private (Admin)
exports.updateSpontaneousApplicationStatus = async (req, res) => {
  try {
    const { status, adminNotes, interviewDetails } = req.body;

    const application = await SpontaneousApplication.findByPk(req.params.id);
    if (!application) {
      const response = serverMessage(res, "SPONTANEOUS_APPLICATION_NOT_FOUND");
      return response;
    }

    const previousStatus = application.status;

    await application.update({
      status,
      ...(adminNotes && { adminNotes }),
    });

    // Send status update email to candidate if status changed
    if (status !== previousStatus && ['reviewing', 'contacted', 'interview', 'accepted', 'rejected'].includes(status)) {
      try {
        await sendStatusUpdateEmail(
          application.email,
          application.firstName,
          application.desiredPosition || 'votre candidature',
          status === 'contacted' ? 'shortlisted' : status, // Map 'contacted' to 'shortlisted' for email template
          interviewDetails || null
        );
        console.log(`✅ Status update email sent to ${application.email} (${status})`);
      } catch (emailError) {
        console.error("Failed to send status update email:", emailError);
      }
    }

    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_STATUS_UPDATED", application);
    return response;
  } catch (error) {
    console.error("Update spontaneous application status error:", error);
    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete spontaneous application (admin)
// @route   DELETE /api/applications/spontaneous/:id
// @access  Private (Admin)
exports.deleteSpontaneousApplication = async (req, res) => {
  try {
    const application = await SpontaneousApplication.findByPk(req.params.id);
    if (!application) {
      const response = serverMessage(res, "SPONTANEOUS_APPLICATION_NOT_FOUND");
      return response;
    }

    await application.destroy();
    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_DELETED");
    return response;
  } catch (error) {
    console.error("Delete spontaneous application error:", error);
    const response = serverMessage(res, "SPONTANEOUS_APPLICATION_DELETE_ERROR");
    return response;
  }
};
