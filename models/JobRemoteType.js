const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobRemoteType = sequelize.define('JobRemoteType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
    // { fr: '100% Remote', en: '100% Remote' }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // 'remote', 'hybrid', 'onsite'
  },
  description: {
    type: DataTypes.JSONB,
    // { fr: 'Travaillez de n\'importe où', en: 'Work from anywhere' }
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'purple',
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['slug'],
      unique: true,
    },
  ],
});

module.exports = JobRemoteType;
