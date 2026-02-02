const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SiteSettings = sequelize.define(
  "SiteSettings",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // General Identity
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DevPortfolio",
    },
    emailContact: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "contact@example.com",
    },

    // SEO & Meta
    seoTitle: {
      type: DataTypes.JSON, // { fr: "...", en: "..." }
      defaultValue: { fr: "Portfolio Développeur", en: "Developer Portfolio" },
    },
    seoDescription: {
      type: DataTypes.JSON,
      defaultValue: { fr: "", en: "" },
    },

    // Hero Section Content
    heroTitle: {
      type: DataTypes.JSON,
      defaultValue: { fr: "Bonjour, je suis...", en: "Hi, I am..." },
    },
    heroSubtitle: {
      type: DataTypes.JSON,
      defaultValue: { fr: "Développeur FullStack", en: "FullStack Developer" },
    },

    // Social Links
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Resume / CV
    cvUrlFr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvUrlEn: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Appearance
    availableForWork: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    primaryColor: {
      type: DataTypes.STRING,
      defaultValue: "blue",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = SiteSettings;
