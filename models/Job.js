const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Développeur Full-Stack', en: 'Full-Stack Developer' }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 'senior-fullstack-developer'
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Description...', en: 'Description...' }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false, // 'development', 'design', 'marketing', 'management', 'other'
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: 'Remote',
  },
  contractType: {
    type: DataTypes.STRING,
    allowNull: false, // 'fulltime', 'parttime', 'contract', 'freelance', 'internship'
  },
  remoteType: {
    type: DataTypes.STRING,
    allowNull: false, // 'remote', 'hybrid', 'onsite'
  },
  salary: {
    type: DataTypes.STRING, // Ex: '40k-50k €/an'
  },
  requirements: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [], // Liste des compétences requises
  },
  responsibilities: {
    type: DataTypes.JSONB,
    // { fr: 'texte...', en: 'text...' }
  },
  benefits: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: [], // Liste des avantages
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [], // ['React', 'Node.js', 'TypeScript']
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'draft', // 'published', 'draft'
  },
  applicationsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Job;
