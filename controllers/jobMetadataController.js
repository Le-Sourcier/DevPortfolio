const JobCategory = require("../models/JobCategory");
const JobContractType = require("../models/JobContractType");
const JobRemoteType = require("../models/JobRemoteType");
const serverMessage = require("../utils/serverMessage");

// ==================== JOB CATEGORIES ====================

// @desc    Get all job categories
// @route   GET /api/jobs/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await JobCategory.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });

    const response = serverMessage(res, "GET_ALL_CATEGORIES_SUCCESS", categories);
    return response;
  } catch (error) {
    console.error("Get categories error:", error);
    const response = serverMessage(res, "GET_ALL_CATEGORIES_ERROR");
    return response;
  }
};

// @desc    Create a job category
// @route   POST /api/jobs/categories
// @access  Private (Admin)
exports.createCategory = async (req, res) => {
  try {
    const category = await JobCategory.create(req.body);
    const response = serverMessage(res, "CATEGORY_CREATED", category);
    return response;
  } catch (error) {
    console.error("Create category error:", error);
    const response = serverMessage(res, "CATEGORY_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a job category
// @route   PUT /api/jobs/categories/:id
// @access  Private (Admin)
exports.updateCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByPk(req.params.id);

    if (!category) {
      const response = serverMessage(res, "CATEGORY_NOT_FOUND");
      return response;
    }

    await category.update(req.body);
    const response = serverMessage(res, "CATEGORY_UPDATED", category);
    return response;
  } catch (error) {
    console.error("Update category error:", error);
    const response = serverMessage(res, "CATEGORY_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a job category
// @route   DELETE /api/jobs/categories/:id
// @access  Private (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await JobCategory.findByPk(req.params.id);

    if (!category) {
      const response = serverMessage(res, "CATEGORY_NOT_FOUND");
      return response;
    }

    await category.destroy();
    const response = serverMessage(res, "CATEGORY_DELETED");
    return response;
  } catch (error) {
    console.error("Delete category error:", error);
    const response = serverMessage(res, "CATEGORY_DELETE_ERROR");
    return response;
  }
};

// ==================== CONTRACT TYPES ====================

// @desc    Get all contract types
// @route   GET /api/jobs/contract-types
// @access  Public
exports.getContractTypes = async (req, res) => {
  try {
    const contractTypes = await JobContractType.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });

    const response = serverMessage(res, "GET_ALL_CONTRACT_TYPES_SUCCESS", contractTypes);
    return response;
  } catch (error) {
    console.error("Get contract types error:", error);
    const response = serverMessage(res, "GET_ALL_CONTRACT_TYPES_ERROR");
    return response;
  }
};

// @desc    Create a contract type
// @route   POST /api/jobs/contract-types
// @access  Private (Admin)
exports.createContractType = async (req, res) => {
  try {
    const contractType = await JobContractType.create(req.body);
    const response = serverMessage(res, "CONTRACT_TYPE_CREATED", contractType);
    return response;
  } catch (error) {
    console.error("Create contract type error:", error);
    const response = serverMessage(res, "CONTRACT_TYPE_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a contract type
// @route   PUT /api/jobs/contract-types/:id
// @access  Private (Admin)
exports.updateContractType = async (req, res) => {
  try {
    const contractType = await JobContractType.findByPk(req.params.id);

    if (!contractType) {
      const response = serverMessage(res, "CONTRACT_TYPE_NOT_FOUND");
      return response;
    }

    await contractType.update(req.body);
    const response = serverMessage(res, "CONTRACT_TYPE_UPDATED", contractType);
    return response;
  } catch (error) {
    console.error("Update contract type error:", error);
    const response = serverMessage(res, "CONTRACT_TYPE_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a contract type
// @route   DELETE /api/jobs/contract-types/:id
// @access  Private (Admin)
exports.deleteContractType = async (req, res) => {
  try {
    const contractType = await JobContractType.findByPk(req.params.id);

    if (!contractType) {
      const response = serverMessage(res, "CONTRACT_TYPE_NOT_FOUND");
      return response;
    }

    await contractType.destroy();
    const response = serverMessage(res, "CONTRACT_TYPE_DELETED");
    return response;
  } catch (error) {
    console.error("Delete contract type error:", error);
    const response = serverMessage(res, "CONTRACT_TYPE_DELETE_ERROR");
    return response;
  }
};

// ==================== REMOTE TYPES ====================

// @desc    Get all remote types
// @route   GET /api/jobs/remote-types
// @access  Public
exports.getRemoteTypes = async (req, res) => {
  try {
    const remoteTypes = await JobRemoteType.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['createdAt', 'ASC']],
    });

    const response = serverMessage(res, "GET_ALL_REMOTE_TYPES_SUCCESS", remoteTypes);
    return response;
  } catch (error) {
    console.error("Get remote types error:", error);
    const response = serverMessage(res, "GET_ALL_REMOTE_TYPES_ERROR");
    return response;
  }
};

// @desc    Create a remote type
// @route   POST /api/jobs/remote-types
// @access  Private (Admin)
exports.createRemoteType = async (req, res) => {
  try {
    const remoteType = await JobRemoteType.create(req.body);
    const response = serverMessage(res, "REMOTE_TYPE_CREATED", remoteType);
    return response;
  } catch (error) {
    console.error("Create remote type error:", error);
    const response = serverMessage(res, "REMOTE_TYPE_CREATE_ERROR");
    return response;
  }
};

// @desc    Update a remote type
// @route   PUT /api/jobs/remote-types/:id
// @access  Private (Admin)
exports.updateRemoteType = async (req, res) => {
  try {
    const remoteType = await JobRemoteType.findByPk(req.params.id);

    if (!remoteType) {
      const response = serverMessage(res, "REMOTE_TYPE_NOT_FOUND");
      return response;
    }

    await remoteType.update(req.body);
    const response = serverMessage(res, "REMOTE_TYPE_UPDATED", remoteType);
    return response;
  } catch (error) {
    console.error("Update remote type error:", error);
    const response = serverMessage(res, "REMOTE_TYPE_UPDATE_ERROR");
    return response;
  }
};

// @desc    Delete a remote type
// @route   DELETE /api/jobs/remote-types/:id
// @access  Private (Admin)
exports.deleteRemoteType = async (req, res) => {
  try {
    const remoteType = await JobRemoteType.findByPk(req.params.id);

    if (!remoteType) {
      const response = serverMessage(res, "REMOTE_TYPE_NOT_FOUND");
      return response;
    }

    await remoteType.destroy();
    const response = serverMessage(res, "REMOTE_TYPE_DELETED");
    return response;
  } catch (error) {
    console.error("Delete remote type error:", error);
    const response = serverMessage(res, "REMOTE_TYPE_DELETE_ERROR");
    return response;
  }
};

// ==================== GET ALL METADATA ====================

// @desc    Get all job metadata (categories, contract types, remote types)
// @route   GET /api/jobs/metadata
// @access  Public
exports.getAllMetadata = async (req, res) => {
  try {
    const [categories, contractTypes, remoteTypes] = await Promise.all([
      JobCategory.findAll({
        where: { isActive: true },
        order: [['order', 'ASC']],
      }),
      JobContractType.findAll({
        where: { isActive: true },
        order: [['order', 'ASC']],
      }),
      JobRemoteType.findAll({
        where: { isActive: true },
        order: [['order', 'ASC']],
      }),
    ]);

    const metadata = {
      categories,
      contractTypes,
      remoteTypes,
    };

    const response = serverMessage(res, "GET_ALL_METADATA_SUCCESS", metadata);
    return response;
  } catch (error) {
    console.error("Get all metadata error:", error);
    const response = serverMessage(res, "GET_ALL_METADATA_ERROR");
    return response;
  }
};
