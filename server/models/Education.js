const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  degree: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Licence Professionnelle', en: 'Professional Bachelor' }
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: true, // Optional field
  },
});

module.exports = Education;
