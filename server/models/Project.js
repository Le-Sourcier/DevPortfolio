const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Titre du projet', en: 'Project Title' }
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Description...', en: 'Description...' }
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  projectUrl: {
    type: DataTypes.STRING,
  },
  repoUrl: {
    type: DataTypes.STRING,
  },
});

module.exports = Project;
