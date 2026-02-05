const JobCategory = require("../models/JobCategory");
const JobContractType = require("../models/JobContractType");
const JobRemoteType = require("../models/JobRemoteType");

const seedJobMetadata = async () => {
  console.log("🌱 Seeding job metadata...");

  try {
    // Seed Categories
    const categories = [
      {
        name: { fr: "Développement", en: "Development" },
        slug: "development",
        description: { fr: "Postes de développement logiciel", en: "Software development positions" },
        icon: "Code2",
        color: "blue",
        order: 1,
      },
      {
        name: { fr: "Design", en: "Design" },
        slug: "design",
        description: { fr: "Postes de design UI/UX", en: "UI/UX design positions" },
        icon: "Palette",
        color: "purple",
        order: 2,
      },
      {
        name: { fr: "Marketing", en: "Marketing" },
        slug: "marketing",
        description: { fr: "Postes de marketing et communication", en: "Marketing and communication positions" },
        icon: "TrendingUp",
        color: "green",
        order: 3,
      },
      {
        name: { fr: "Management", en: "Management" },
        slug: "management",
        description: { fr: "Postes de gestion et management", en: "Management positions" },
        icon: "Users",
        color: "orange",
        order: 4,
      },
      {
        name: { fr: "Autre", en: "Other" },
        slug: "other",
        description: { fr: "Autres postes", en: "Other positions" },
        icon: "Briefcase",
        color: "gray",
        order: 5,
      },
    ];

    for (const category of categories) {
      await JobCategory.findOrCreate({
        where: { slug: category.slug },
        defaults: category,
      });
    }
    console.log("✅ Categories seeded");

    // Seed Contract Types
    const contractTypes = [
      {
        name: { fr: "CDI", en: "Full-time" },
        slug: "fulltime",
        description: { fr: "Contrat à durée indéterminée", en: "Permanent contract" },
        color: "green",
        order: 1,
      },
      {
        name: { fr: "Temps partiel", en: "Part-time" },
        slug: "parttime",
        description: { fr: "Contrat à temps partiel", en: "Part-time contract" },
        color: "blue",
        order: 2,
      },
      {
        name: { fr: "CDD", en: "Contract" },
        slug: "contract",
        description: { fr: "Contrat à durée déterminée", en: "Fixed-term contract" },
        color: "orange",
        order: 3,
      },
      {
        name: { fr: "Freelance", en: "Freelance" },
        slug: "freelance",
        description: { fr: "Mission freelance", en: "Freelance mission" },
        color: "purple",
        order: 4,
      },
      {
        name: { fr: "Stage", en: "Internship" },
        slug: "internship",
        description: { fr: "Stage en entreprise", en: "Internship" },
        color: "yellow",
        order: 5,
      },
    ];

    for (const contractType of contractTypes) {
      await JobContractType.findOrCreate({
        where: { slug: contractType.slug },
        defaults: contractType,
      });
    }
    console.log("✅ Contract types seeded");

    // Seed Remote Types
    const remoteTypes = [
      {
        name: { fr: "100% Remote", en: "100% Remote" },
        slug: "remote",
        description: { fr: "Travaillez de n'importe où", en: "Work from anywhere" },
        color: "purple",
        order: 1,
      },
      {
        name: { fr: "Hybride", en: "Hybrid" },
        slug: "hybrid",
        description: { fr: "Flexibilité remote et bureau", en: "Remote and office flexibility" },
        color: "blue",
        order: 2,
      },
      {
        name: { fr: "Sur site", en: "On-site" },
        slug: "onsite",
        description: { fr: "Présence au bureau", en: "Office presence required" },
        color: "orange",
        order: 3,
      },
    ];

    for (const remoteType of remoteTypes) {
      await JobRemoteType.findOrCreate({
        where: { slug: remoteType.slug },
        defaults: remoteType,
      });
    }
    console.log("✅ Remote types seeded");

    console.log("✨ Job metadata seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding job metadata:", error);
    throw error;
  }
};

module.exports = seedJobMetadata;
