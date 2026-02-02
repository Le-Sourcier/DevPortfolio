const Skill = require("../models/Skill");
const serverMessage = require("../utils/serverMessage");

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll();
    const response = serverMessage(res, "SKILLS_RETRIEVED", skills);
    return response;
  } catch (error) {
    const response = serverMessage(res, "SKILLS_RETRIEVAL_ERROR");
    return response;
  }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    const response = serverMessage(res, "SKILL_CREATED", skill);
    return response;
  } catch (error) {
    const response = serverMessage(res, "SKILL_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return serverMessage(res, "SKILL_NOT_FOUND");
    }
    await skill.update(req.body);
    const response = serverMessage(res, "SKILL_UPDATED", skill);
    return response;
  } catch (error) {
    const response = serverMessage(res, "SKILL_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return serverMessage(res, "SKILL_NOT_FOUND");
    }
    await skill.destroy();
    const response = serverMessage(res, "SKILL_DELETED");
    return response;
  } catch (error) {
    const response = serverMessage(res, "SKILL_DELETE_ERROR");
    return response;
  }
};
