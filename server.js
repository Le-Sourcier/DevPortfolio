const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize, connectDB } = require("./config/database");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Load model associations
require('./models/index');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Sync database models and alter tables to match models (adds columns like 'featured')
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(
      "Database synchronized (alter mode): tables updated to match models"
    );
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

// Mount routers
const authRoutes = require("./routes/authRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const educationRoutes = require("./routes/educationRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const commentRoutes = require("./routes/commentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const jobAlertRoutes = require("./routes/jobAlertRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/blogposts", blogPostRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/job-alerts", jobAlertRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
