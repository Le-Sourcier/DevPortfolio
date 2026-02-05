const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobCategory = sequelize.define('JobCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
    // { fr: 'Développement', en: 'Development' }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // 'development', 'design', 'marketing', etc.
  },
  description: {
    type: DataTypes.JSONB,
    // { fr: 'Description...', en: 'Description...' }
  },
  icon: {
    type: DataTypes.STRING,
    // Nom de l'icône Lucide ou emoji
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'blue',
    // 'blue', 'purple', 'green', 'orange', etc.
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    // Pour trier les catégories
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
    {
      fields: ['order'],
    },
  ],
});

module.exports = JobCategory;
