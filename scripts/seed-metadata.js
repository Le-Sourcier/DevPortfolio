const axios = require('axios');

const API_URL = 'http://localhost:5000/api/jobs';

// Données de seed
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

async function seedMetadata() {
  console.log('🌱 Starting metadata seeding...\n');

  try {
    // Seed Categories
    console.log('📁 Seeding categories...');
    for (const category of categories) {
      try {
        await axios.post(`${API_URL}/categories`, category);
        console.log(`  ✅ Created: ${category.name.fr}`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.data?.message?.includes('exists')) {
          console.log(`  ⏭️  Already exists: ${category.name.fr}`);
        } else {
          console.log(`  ❌ Error: ${category.name.fr} - ${error.message}`);
        }
      }
    }

    // Seed Contract Types
    console.log('\n📝 Seeding contract types...');
    for (const contractType of contractTypes) {
      try {
        await axios.post(`${API_URL}/contract-types`, contractType);
        console.log(`  ✅ Created: ${contractType.name.fr}`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.data?.message?.includes('exists')) {
          console.log(`  ⏭️  Already exists: ${contractType.name.fr}`);
        } else {
          console.log(`  ❌ Error: ${contractType.name.fr} - ${error.message}`);
        }
      }
    }

    // Seed Remote Types
    console.log('\n🌍 Seeding remote types...');
    for (const remoteType of remoteTypes) {
      try {
        await axios.post(`${API_URL}/remote-types`, remoteType);
        console.log(`  ✅ Created: ${remoteType.name.fr}`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.data?.message?.includes('exists')) {
          console.log(`  ⏭️  Already exists: ${remoteType.name.fr}`);
        } else {
          console.log(`  ❌ Error: ${remoteType.name.fr} - ${error.message}`);
        }
      }
    }

    console.log('\n✨ Metadata seeding completed!\n');

    // Verify
    const response = await axios.get(`${API_URL}/metadata`);
    console.log('📊 Current metadata count:');
    console.log(`  - Categories: ${response.data.data.categories.length}`);
    console.log(`  - Contract Types: ${response.data.data.contractTypes.length}`);
    console.log(`  - Remote Types: ${response.data.data.remoteTypes.length}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedMetadata();
