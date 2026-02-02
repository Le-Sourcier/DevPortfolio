// pages/Home.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Code2,
  ExternalLink,
  Calendar,
  Database,
  Cloud,
  Terminal,
  Sparkles,
  Zap,
  Clock,
  Star,
  Package,
  CheckCircle2,
  Play,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Quote,
  Users,
  Award,
  TrendingUp,
  BookOpen,
} from "lucide-react";

import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { useProjects } from "../api/projects";
import { useBlogPosts } from "../api/blogposts";
import { useSiteSettings } from "../api/settings";

const Home = () => {
  const { i18n, t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const { data: apiProjects, isLoading: loadingProjects } = useProjects();
  const { data: apiPosts, isLoading: loadingPosts } = useBlogPosts();
  const [activeExpertise, setActiveExpertise] = useState<number | null>(null);

  const featuredProjects = (apiProjects?.data || []).filter((p: any) => p.featured).slice(0, 3);
  const recentPosts = (apiPosts?.data || []).slice(0, 3);

  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  const heroTitle = settings?.heroTitle?.[lang] || t("hero.title");
  const heroSubtitle = settings?.heroSubtitle?.[lang] || t("hero.subtitle");

  const stats = [
    { value: "50+", label: "Projets livrés", icon: Package },
    { value: "5+", label: "Années d'expérience", icon: Clock },
    { value: "100%", label: "Satisfaction client", icon: Star },
    { value: "24h", label: "Temps de réponse", icon: Zap },
  ];

  const expertiseAreas = [
    {
      icon: Globe,
      title: "Frontend & Mobile",
      description: "Applications web et mobiles modernes, performantes et accessibles.",
      gradient: "from-blue-500 to-cyan-500",
      technologies: ["React 18", "Next.js 14", "Vue.js 3", "Flutter", "React Native", "TypeScript"],
      highlight: "5+ ans",
    },
    {
      icon: Database,
      title: "Backend & API",
      description: "APIs robustes, architecture microservices et bases de données optimisées.",
      gradient: "from-purple-500 to-pink-500",
      technologies: ["Node.js", "NestJS", "Express", "Python", "PostgreSQL", "MongoDB"],
      highlight: "Microservices",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Infrastructure cloud, CI/CD et déploiement continu automatisé.",
      gradient: "from-emerald-500 to-teal-500",
      technologies: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Vercel"],
      highlight: "Scalable",
    },
  ];

  const techStack = [
    { name: "React / Next.js", icon: Code2 },
    { name: "Node.js / NestJS", icon: Database },
    { name: "TypeScript", icon: Terminal },
    { name: "Flutter / React Native", icon: Smartphone },
    { name: "AWS / Docker", icon: Cloud },
  ];

  const testimonials = [
    {
      content: "Une expertise technique remarquable et une communication fluide tout au long du projet.",
      author: "Marie D.",
      role: "CEO, TechStartup",
      avatar: "MD",
    },
    {
      content: "Livraison dans les délais avec une qualité de code exceptionnelle. Je recommande vivement.",
      author: "Jean M.",
      role: "CTO, InnovateCorp",
      avatar: "JM",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={settings?.seoTitle?.[lang] || "Portfolio"}
        description={settings?.seoDescription?.[lang] || "Développeur Full Stack"}
        url="/"
      />

      {/* Hero Section - starts from top, under the header */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background - extends beyond section to cover header area */}
        <div className="absolute -top-20 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
        <div className="absolute -top-20 left-0 right-0 bottom-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium mb-8"
              >
                <span className="relative flex h-2.5 w-2.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                </span>
                {settings?.availableForWork ? t("hero.available") : "Actuellement indisponible"}
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1]"
              >
                Développeur{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Full-Stack
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                {heroSubtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              >
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/20">
                    Démarrer un projet <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur">
                    <Play className="mr-2 h-5 w-5" /> Voir mes services
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              >
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-4 mt-12"
              >
                <a href="https://github.com/Le-Sourcier" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/yao-logan" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:yaodavidlogan02@gmail.com" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-gray-950"
            />
          </svg>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Technologies
            </span>
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <tech.icon className="w-5 h-5" />
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t("skills.technicalExpertise")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {t("skills.subtitle")}
              </p>
            </motion.div>
          </div>

          {/* Expertise Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {expertiseAreas.map((area, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveExpertise(idx)}
                onMouseLeave={() => setActiveExpertise(null)}
                className="group relative"
              >
                <div className={`relative h-full rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-8 transition-all duration-500 overflow-hidden ${
                  activeExpertise === idx
                    ? 'shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 -translate-y-2'
                    : 'shadow-sm hover:shadow-lg'
                }`}>
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${area.gradient} text-white shadow-lg`}>
                      {area.highlight}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <area.icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {area.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transform transition-all duration-500 ${
                    activeExpertise === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                Explorer tous les services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {!loadingProjects && featuredProjects.length > 0 && (
        <section className="py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
                  <Package className="w-4 h-4 mr-2" />
                  Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {t("home.recentProjects")}
                </h2>
              </div>
              <Link to="/projects" className="group inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                {t("common.viewAll")} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project: any, idx: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={project.projectUrl || "#"} className="group block h-full">
                    <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 aspect-[4/3] mb-6">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title[lang]}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                          <Code2 size={48} className="text-gray-400 dark:text-gray-600" />
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-900 font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          Voir le projet <ExternalLink className="ml-2 w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title[lang]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {project.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech: string) => (
                        <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-6">
                <Users className="w-4 h-4 mr-2" />
                Témoignages
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Ce que disent mes clients
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-950 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <Quote className="w-10 h-10 text-blue-500/20 mb-4" />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {!loadingPosts && recentPosts.length > 0 && (
        <section className="py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
              <div>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Blog
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {t("blog.title")}
                </h2>
              </div>
              <Link to="/blog" className="group inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                Voir tous les articles <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Posts Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post: any, idx: number) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block h-full">
                    <div className="h-full bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                          Tech
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title[lang]}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                        {post.summary[lang]}
                      </p>

                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                        Lire l'article <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose d'extraordinaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                  Démarrer maintenant <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <a href="mailto:yaodavidlogan02@gmail.com">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-white/30 text-white hover:bg-white/10">
                  <Mail className="mr-2 w-5 h-5" />
                  yaodavidlogan02@gmail.com
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
