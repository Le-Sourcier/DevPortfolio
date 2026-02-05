const Job = require("../models/Job");
const serverMessage = require("../utils/serverMessage");
const { sendAlertsForNewJob } = require("../services/jobAlertService");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const { status, category, contractType, remoteType } = req.query;

    const where = {};

    // Filtrer par statut (par défaut: publié pour le public)
    if (status) {
      where.status = status;
    } else {
      // Si pas de statut spécifié et pas authentifié, ne montrer que les publiés
      if (!req.user) {
        where.status = 'published';
      }
    }

    // Filtres additionnels
    if (category) where.category = category;
    if (contractType) where.contractType = contractType;
    if (remoteType) where.remoteType = remoteType;

    const jobs = await Job.findAll({
      where,
      order: [
        ["status", "DESC"], // published first
        ["createdAt", "DESC"],
      ],
    });

    const response = serverMessage(res, "GET_ALL_JOBS_SUCCESS", jobs);
    return response;
  } catch (error) {
    console.error("Get jobs error:", error);
    const response = serverMessage(res, "GET_ALL_JOBS_ERROR");
    return response;
  }
};

// @desc    Get a single job by ID or slug
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let job;

    // Check if identifier is a UUID (contains hyphens) or a slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    if (isUUID) {
      job = await Job.findByPk(identifier);
    } else {
      // Search by slug
      job = await Job.findOne({ where: { slug: identifier } });
    }

    if (!job) {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    // Si pas authentifié, ne montrer que les jobs publiés
    if (!req.user && job.status !== 'published') {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    const response = serverMessage(res, "GET_JOB_SUCCESS", job);
    return response;
  } catch (error) {
    console.error("Get job error:", error);
    const response = serverMessage(res, "GET_JOB_ERROR");
    return response;
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
exports.createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    const response = serverMessage(res, "JOB_CREATED", job);
    return response;
  } catch (error) {
    console.error("Create job error:", error);
    const response = serverMessage(res, "JOB_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    await job.update(req.body);
    const response = serverMessage(res, "JOB_UPDATED", job);
    return response;
  } catch (error) {
    console.error("Update job error:", error);
    const response = serverMessage(res, "JOB_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    await job.destroy();
    const response = serverMessage(res, "JOB_DELETED");
    return response;
  } catch (error) {
    console.error("Delete job error:", error);
    const response = serverMessage(res, "JOB_DELETE_ERROR");
    return response;
  }
};

// @desc    Publish/unpublish a job
// @route   PATCH /api/jobs/:id/status
// @access  Private
exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      const response = serverMessage(res, "JOB_NOT_FOUND");
      return response;
    }

    if (!['published', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'published' or 'draft'",
      });
    }

    const previousStatus = job.status;
    await job.update({ status });

    // If job just became published, send alerts to subscribed candidates
    if (status === 'published' && previousStatus !== 'published') {
      // Send alerts asynchronously (don't wait for it)
      sendAlertsForNewJob(job)
        .then(result => {
          console.log(`✅ Job alerts sent for "${job.title.fr}":`, result);
        })
        .catch(err => {
          console.error(`❌ Failed to send job alerts for "${job.title.fr}":`, err);
        });
    }

    const response = serverMessage(res, "JOB_STATUS_UPDATED", job);
    return response;
  } catch (error) {
    console.error("Update job status error:", error);
    const response = serverMessage(res, "JOB_STATUS_UPDATE_ERROR");
    return response;
  }
};
