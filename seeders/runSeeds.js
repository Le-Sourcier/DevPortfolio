const dotenv = require("dotenv");
const path = require("path");

// Load env vars from backend root
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { connectDB, sequelize } = require("../config/database");
const seedJobMetadata = require("./jobMetadataSeed");
const seedJobs = require("./jobsSeed");

const runSeeds = async () => {
  try {
    console.log("🌱 Starting seeding process...\n");

    // Connect to database
    await connectDB();

    // Sync models first
    console.log("🔄 Syncing database models...");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced\n");

    // Run seeders
    await seedJobMetadata();
    await seedJobs();

    console.log("\n✨ All seeds completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    console.error(error.stack);
    process.exit(1);
  }
};

runSeeds();
