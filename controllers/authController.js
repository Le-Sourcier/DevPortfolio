const User = require("../models/User");
const jwt = require("jsonwebtoken");
const serverMessage = require("../utils/serverMessage");

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
    return serverMessage(res, "REGISTRATION_CLOSED");
  }

  const { username, password } = req.body;

  try {
    const user = await User.create({
      username,
      password,
    });
    if (!user) {
      return serverMessage(res, "ADMIN_USER_CREATE_ERROR");
    }

    return serverMessage(res, "ADMIN_USER_CREATED");
  } catch (error) {
    return serverMessage(res, "ADMIN_USER_CREATE_ERROR", error.message);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return serverMessage(res, "PLEASE_PROVIDE_USERNAME_AND_PASSWORD");
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return serverMessage(res, "INVALID_CREDENTIALS");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return serverMessage(res, "INVALID_CREDENTIALS");
    }

    const token = generateToken(user.id);

    return serverMessage(res, "LOGIN_SUCCESS", { token });
  } catch (error) {
    return serverMessage(res, "LOGIN_ERROR", error.message);
  }
};
