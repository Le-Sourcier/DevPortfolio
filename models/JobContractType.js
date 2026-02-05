const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobContractType = sequelize.define('JobContractType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
    // { fr: 'CDI', en: 'Full-time' }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // 'fulltime', 'parttime', 'contract', 'freelance', 'internship'
  },
  description: {
    type: DataTypes.JSONB,
    // { fr: 'Contrat à durée indéterminée', en: 'Permanent contract' }
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'green',
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

module.exports = JobContractType;
