const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Example: { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' }
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true, // Can be null for current job
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: false,
    // Example: { fr: 'Description en français...', en: 'Description in English...' }
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = Experience;
