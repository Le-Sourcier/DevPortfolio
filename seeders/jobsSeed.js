const Job = require("../models/Job");

const seedJobs = async () => {
  console.log("🌱 Seeding sample jobs...");

  try {
    // Sample jobs
    const jobs = [
      {
        title: {
          fr: "Développeur Full Stack Senior",
          en: "Senior Full Stack Developer"
        },
        slug: "senior-fullstack-developer",
        description: {
          fr: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe et construire des applications web modernes.",
          en: "We are looking for an experienced Full Stack developer to join our team and build modern web applications."
        },
        requirements: ["5+ ans d'expérience", "React", "Node.js", "TypeScript"],
        responsibilities: {
          fr: "Développer des fonctionnalités frontend et backend, collaborer avec l'équipe produit",
          en: "Develop frontend and backend features, collaborate with product team"
        },
        benefits: ["Salaire compétitif", "Remote possible", "Formation continue"],
        category: "development",
        contractType: "fulltime",
        remoteType: "hybrid",
        location: "Paris, France",
        salary: "50000-70000",
        tags: ["React", "Node.js", "TypeScript", "MongoDB"],
        status: "published",
        featured: true,
      },
      {
        title: {
          fr: "Designer UI/UX",
          en: "UI/UX Designer"
        },
        slug: "ui-ux-designer",
        description: {
          fr: "Créez des expériences utilisateur exceptionnelles pour nos produits digitaux.",
          en: "Create exceptional user experiences for our digital products."
        },
        requirements: ["3+ ans d'expérience", "Figma", "Design UI/UX"],
        responsibilities: {
          fr: "Concevoir des interfaces, réaliser des prototypes, tests utilisateurs",
          en: "Design interfaces, create prototypes, user testing"
        },
        benefits: ["Remote 100%", "Équipement fourni", "Projets variés"],
        category: "design",
        contractType: "fulltime",
        remoteType: "remote",
        location: "Remote",
        salary: "40000-55000",
        tags: ["Figma", "UI Design", "UX Research", "Prototyping"],
        status: "published",
        featured: false,
      },
      {
        title: {
          fr: "Développeur Frontend React",
          en: "React Frontend Developer"
        },
        slug: "react-frontend-developer",
        description: {
          fr: "Rejoignez notre équipe pour développer des interfaces utilisateur performantes et élégantes.",
          en: "Join our team to develop performant and elegant user interfaces."
        },
        requirements: ["2+ ans d'expérience React", "TypeScript"],
        responsibilities: {
          fr: "Développer des composants réutilisables, optimiser les performances",
          en: "Develop reusable components, optimize performance"
        },
        benefits: ["Horaires flexibles", "Équipe dynamique"],
        category: "development",
        contractType: "contract",
        remoteType: "hybrid",
        location: "Lyon, France",
        salary: "35000-45000",
        tags: ["React", "TypeScript", "CSS", "Jest"],
        status: "published",
        featured: false,
      },
      {
        title: {
          fr: "Stage Développement Web",
          en: "Web Development Internship"
        },
        slug: "web-development-internship",
        description: {
          fr: "Apprenez les meilleures pratiques du développement web au sein d'une équipe passionnée.",
          en: "Learn web development best practices within a passionate team."
        },
        requirements: ["Étudiant en informatique", "HTML/CSS/JavaScript"],
        responsibilities: {
          fr: "Participer au développement de fonctionnalités, apprendre des seniors",
          en: "Participate in feature development, learn from seniors"
        },
        benefits: ["Mentorat", "Projets concrets", "Possibilité d'embauche"],
        category: "development",
        contractType: "internship",
        remoteType: "onsite",
        location: "Paris, France",
        salary: "800-1200",
        tags: ["JavaScript", "HTML", "CSS", "Git"],
        status: "published",
        featured: false,
      },
      {
        title: {
          fr: "Marketing Manager",
          en: "Marketing Manager"
        },
        slug: "marketing-manager",
        description: {
          fr: "Pilotez notre stratégie marketing et développez notre présence en ligne.",
          en: "Lead our marketing strategy and develop our online presence."
        },
        requirements: ["5+ ans marketing digital", "Growth hacking"],
        responsibilities: {
          fr: "Définir la stratégie marketing, gérer les campagnes, analyser les performances",
          en: "Define marketing strategy, manage campaigns, analyze performance"
        },
        benefits: ["Autonomie", "Budget marketing", "Télétravail partiel"],
        category: "marketing",
        contractType: "fulltime",
        remoteType: "hybrid",
        location: "Bordeaux, France",
        salary: "45000-60000",
        tags: ["SEO", "Content Marketing", "Analytics", "Social Media"],
        status: "published",
        featured: true,
      },
    ];

    for (const job of jobs) {
      await Job.findOrCreate({
        where: { slug: job.slug },
        defaults: job,
      });
    }

    console.log("✅ Sample jobs seeded");
  } catch (error) {
    console.error("❌ Error seeding jobs:", error);
    throw error;
  }
};

module.exports = seedJobs;
