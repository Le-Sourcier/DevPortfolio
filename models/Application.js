const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Jobs',
      key: 'id',
    },
    onDelete: 'CASCADE',
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
  },
  // Status
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // 'pending', 'reviewing', 'shortlisted', 'interview', 'rejected', 'accepted'
  },
  // Admin Notes
  adminNotes: {
    type: DataTypes.TEXT,
  },
  // Job Alert Subscription
  subscribeToAlerts: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Preferences for job alerts (if subscribed)
  alertPreferences: {
    type: DataTypes.JSONB,
    defaultValue: {},
    // { categories: ['development', 'design'], contractTypes: ['fulltime'], remoteTypes: ['remote', 'hybrid'] }
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['jobId'],
    },
    {
      fields: ['email'],
    },
    {
      fields: ['status'],
    },
  ],
});

module.exports = Application;
