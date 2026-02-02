const Education = require("../models/Education");
const serverMessage = require("../utils/serverMessage");

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.findAll({
      order: [["startDate", "DESC"]],
    });
    return serverMessage(res, "EDUCATION_RETRIEVED", education);
  } catch (error) {
    return serverMessage(res, "EDUCATION_RETRIEVAL_ERROR", error.message);
  }
};

// @desc    Create an education record
// @route   POST /api/education
// @access  Private
exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    return serverMessage(res, "EDUCATION_CREATED", education);
  } catch (error) {
    return serverMessage(res, "EDUCATION_CREATE_ERROR", error.message);
  }
};

// @desc    Update an education record
// @route   PUT /api/education/:id
// @access  Private
exports.updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return serverMessage(res, "EDUCATION_NOT_FOUND");
    }
    await education.update(req.body);
    return serverMessage(res, "EDUCATION_UPDATED", education);
  } catch (error) {
    return serverMessage(res, "EDUCATION_UPDATE_ERROR", error.message);
  }
};

// @desc    Delete an education record
// @route   DELETE /api/education/:id
// @access  Private
exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return serverMessage(res, "EDUCATION_NOT_FOUND");
    }
    await education.destroy();
    return serverMessage(res, "EDUCATION_DELETED");
  } catch (error) {
    return serverMessage(res, "EDUCATION_DELETE_ERROR", error.message);
  }
};
