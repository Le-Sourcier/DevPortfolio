const Project = require("../models/Project");
const serverMessage = require("../utils/serverMessage");

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      order: [
        ["featured", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    const response = serverMessage(res, "GET_ALL_PROJECTS_SUCCESS", projects);
    return response;
  } catch (error) {
    const response = serverMessage(res, "GET_ALL_PROJECTS_ERROR");
    return response;
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    const response = serverMessage(res, "PROJECT_CREATED", project);
    return response;
  } catch (error) {
    const response = serverMessage(res, "PROJECT_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      const response = serverMessage(res, "PROJECT_NOT_FOUND");
      return response;
    }
    await project.update(req.body);
    const response = serverMessage(res, "PROJECT_UPDATED", project);
    return response;
  } catch (error) {
    const response = serverMessage(res, "PROJECT_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      const response = serverMessage(res, "PROJECT_NOT_FOUND");
      return response;
    }
    await project.destroy();
    const response = serverMessage(res, "PROJECT_DELETED");
    return response;
  } catch (error) {
    const response = serverMessage(res, "PROJECT_DELETE_ERROR");
    return response;
  }
};
