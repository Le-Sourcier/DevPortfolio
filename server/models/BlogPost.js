const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Titre de l'article', en: 'Blog Post Title' }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  summary: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Résumé...', en: 'Summary...' }
  },
  content: {
    type: DataTypes.JSONB,
    allowNull: false, // { fr: 'Contenu...', en: 'Content...' }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

module.exports = BlogPost;
