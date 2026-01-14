const Education = require('../models/Education');

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.findAll({ order: [['startDate', 'DESC']] });
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an education record
// @route   POST /api/education
// @access  Private
exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an education record
// @route   PUT /api/education/:id
// @access  Private
exports.updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    await education.update(req.body);
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete an education record
// @route   DELETE /api/education/:id
// @access  Private
exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, message: 'Education record not found' });
    }
    await education.destroy();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
