const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register a new user (admin)
// @route   POST /api/auth/register
// @access  Private (limited to initial setup)
exports.register = async (req, res, next) => {
  // Check if a user already exists
  const userExists = await User.count();
  if (userExists > 0) {
    return res.status(403).json({ success: false, message: 'Registration is closed. An admin user already exists.' });
  }

  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
    });

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Please provide a username and password' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
