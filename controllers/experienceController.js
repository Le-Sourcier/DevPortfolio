const Experience = require("../models/Experience");
const serverMessage = require("../utils/serverMessage");

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.findAll({
      order: [["startDate", "DESC"]],
    });
    const response = serverMessage(res, "EXPERIENCES_RETRIEVED", experiences);
    return response;
  } catch (error) {
    const response = serverMessage(res, "EXPERIENCES_RETRIEVAL_ERROR");
    return response;
  }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private
exports.createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    const response = serverMessage(res, "EXPERIENCE_CREATED", experience);
    return response;
  } catch (error) {
    const response = serverMessage(res, "EXPERIENCE_CREATE_ERROR");
    return response;
  }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private
exports.updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      const response = serverMessage(res, "EXPERIENCE_NOT_FOUND");
      return response;
    }
    await experience.update(req.body);
    const response = serverMessage(res, "EXPERIENCE_UPDATED", experience);
    return response;
  } catch (error) {
    const response = serverMessage(res, "EXPERIENCE_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private
exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      const response = serverMessage(res, "EXPERIENCE_NOT_FOUND");
      return response;
    }
    await experience.destroy();
    const response = serverMessage(res, "EXPERIENCE_DELETED");
    return response;
  } catch (error) {
    const response = serverMessage(res, "EXPERIENCE_DELETE_ERROR");
    return response;
  }
};
