const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SpontaneousApplication = sequelize.define('SpontaneousApplication', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // Candidate Info
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Location
  currentLocation: {
    type: DataTypes.STRING,
  },
  // CV and Cover Letter
  cvUrl: {
    type: DataTypes.STRING,
    allowNull: false, // CV is required
  },
  coverLetterUrl: {
    type: DataTypes.STRING, // Optional
  },
  // Links
  linkedinUrl: {
    type: DataTypes.STRING,
  },
  portfolioUrl: {
    type: DataTypes.STRING,
  },
  githubUrl: {
    type: DataTypes.STRING,
  },
  // Desired Position Info
  desiredPosition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desiredCategories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [], // ['development', 'design']
  },
  desiredContractTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [], // ['fulltime', 'freelance']
  },
  desiredRemoteTypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [], // ['remote', 'hybrid']
  },
  // Additional Info
  yearsOfExperience: {
    type: DataTypes.INTEGER,
  },
  currentPosition: {
    type: DataTypes.STRING,
  },
  expectedSalary: {
    type: DataTypes.STRING,
  },
  availabilityDate: {
    type: DataTypes.DATE,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Status
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // 'pending', 'reviewing', 'contacted', 'rejected', 'hired'
  },
  // Admin Notes
  adminNotes: {
    type: DataTypes.TEXT,
  },
  // Job Alert Subscription
  subscribeToAlerts: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // By default, spontaneous candidates want alerts
  },
  // Already sent alert notifications
  sentAlertJobIds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [], // Track which job IDs we've already sent alerts for
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['email'],
    },
    {
      fields: ['status'],
    },
    {
      fields: ['subscribeToAlerts'],
    },
  ],
});

module.exports = SpontaneousApplication;
