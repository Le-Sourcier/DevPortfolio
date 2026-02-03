import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code2,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Download,
  User,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Terminal,
  ChevronRight,
  Trophy,
  Languages,
  Heart,
  CheckCircle,
  Zap,
} from "lucide-react";

import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { useExperiences } from "../api/experiences";
import { useSkills } from "../api/skills";
import { useEducation } from "../api/education";
import { useSiteSettings } from "../api/settings";

const About = () => {
  const { i18n, t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const { data: experiencesData, isLoading: loadingExperiences } = useExperiences();
  const { data: skillsData, isLoading: loadingSkills } = useSkills();
  const { data: educationData, isLoading: loadingEducation } = useEducation();
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  const experiences = experiencesData?.data || [];
  const skills = skillsData?.data || [];
  const education = educationData?.data || [];

  // Group skills by category
  const skillsByCategory = skills.reduce((acc: Record<string, string[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  const categoryColors: Record<string, string> = {
    Frontend: "from-blue-500 to-cyan-500",
    Backend: "from-purple-500 to-pink-500",
    Database: "from-orange-500 to-red-500",
    DevOps: "from-emerald-500 to-teal-500",
    Mobile: "from-indigo-500 to-purple-500",
    Design: "from-pink-500 to-rose-500",
    Tools: "from-gray-500 to-slate-500",
  };

  const categoryIcons: Record<string, any> = {
    Frontend: Globe,
    Backend: Database,
    Database: Database,
    DevOps: Cloud,
    Mobile: Smartphone,
    Design: Code2,
    Tools: Terminal,
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return lang === 'fr' ? "Présent" : "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={lang === 'fr' ? "À propos" : "About"}
        description={lang === 'fr' ? "Mon parcours, mes compétences et mes formations" : "My journey, skills and education"}
        url="/about"
      />

      {/* Hero Section - immersive, extends behind header */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background - extends beyond section to cover header area */}
        <div className="absolute -top-20 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" />
        <div className="absolute -top-20 left-0 right-0 bottom-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
                <User className="w-4 h-4 mr-2" />
                {lang === 'fr' ? "À propos de moi" : "About me"}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {lang === 'fr' ? "Mon " : "My "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  {lang === 'fr' ? "Parcours" : "Journey"}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                {settings?.aboutBio?.[lang] || (lang === 'fr'
                  ? "Développeur Full-Stack passionné avec une expertise dans la création d'applications web et mobiles modernes."
                  : "Passionate Full-Stack Developer with expertise in building modern web and mobile applications.")}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mb-12">
                {settings?.githubUrl && (
                  <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {settings?.linkedinUrl && (
                  <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {settings?.emailContact && (
                  <a href={`mailto:${settings.emailContact}`} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Highlights / Stats */}
              {settings?.aboutHighlights && settings.aboutHighlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
                  {settings.aboutHighlights.slice(0, 4).map((highlight, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-white">{highlight.value}</div>
                      <div className="text-sm text-white/60">{lang === 'fr' ? highlight.labelFr : highlight.labelEn}</div>
                    </div>
                  ))}
                </motion.div>
              )}
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

      {/* Skills Section */}
      <section className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                {lang === 'fr' ? "Compétences" : "Skills"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {lang === 'fr' ? "Expertise Technique" : "Technical Expertise"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {lang === 'fr'
                  ? "Les technologies que je maîtrise pour créer des solutions performantes."
                  : "The technologies I master to create high-performance solutions."}
              </p>
            </motion.div>
          </div>

          {loadingSkills ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : skills.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {lang === 'fr' ? "Aucune compétence renseignée." : "No skills listed."}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills], idx) => {
                const gradient = categoryColors[category] || "from-gray-500 to-slate-500";
                const IconComponent = categoryIcons[category] || Code2;
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onMouseEnter={() => setActiveSkill(idx)}
                    onMouseLeave={() => setActiveSkill(null)}
                    className="group relative"
                  >
                    <div className={`relative h-full rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-8 transition-all duration-500 overflow-hidden ${
                      activeSkill === idx
                        ? 'shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 -translate-y-2'
                        : 'shadow-sm hover:shadow-lg'
                    }`}>
                      {/* Gradient background on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      {/* Badge */}
                      <div className="absolute top-6 right-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${gradient} text-white shadow-lg`}>
                          {(categorySkills as string[]).length} {lang === 'fr' ? "techs" : "techs"}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <IconComponent size={32} className="text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category}</h3>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {(categorySkills as string[]).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Arrow indicator */}
                      <div className={`absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transform transition-all duration-500 ${
                        activeSkill === idx ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}>
                        <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                {lang === 'fr' ? "Expérience" : "Experience"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {lang === 'fr' ? "Parcours Professionnel" : "Professional Journey"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {lang === 'fr'
                  ? "Mon expérience dans le développement de solutions digitales."
                  : "My experience in developing digital solutions."}
              </p>
            </motion.div>
          </div>

          {loadingExperiences ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : experiences.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {lang === 'fr' ? "Aucune expérience renseignée." : "No experience listed."}
            </p>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500" />

                {experiences.map((exp, idx) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-gray-900 z-10" />

                    {/* Content */}
                    <div className={`flex-1 pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-shadow">
                        <div className={`flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.title?.[lang] || exp.title?.fr || exp.title?.en || ""}
                        </h3>
                        <div className={`flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-3 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                          {exp.location && (
                            <>
                              <MapPin className="w-4 h-4 ml-2" />
                              <span>{exp.location}</span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {exp.description?.[lang] || exp.description?.fr || exp.description?.en || ""}
                        </p>
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
                <GraduationCap className="w-4 h-4 mr-2" />
                {lang === 'fr' ? "Formation" : "Education"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {lang === 'fr' ? "Parcours Académique" : "Academic Background"}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {lang === 'fr'
                  ? "Ma formation et mes certifications."
                  : "My education and certifications."}
              </p>
            </motion.div>
          </div>

          {loadingEducation ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          ) : education.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              {lang === 'fr' ? "Aucune formation renseignée." : "No education listed."}
            </p>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {edu.degree?.[lang] || edu.degree?.fr || edu.degree?.en || ""}
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                        {edu.institution}
                      </p>
                      {edu.description && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {edu.description?.[lang] || edu.description?.fr || edu.description?.en || ""}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Languages & Values Section */}
      {((settings?.languages && settings.languages.length > 0) || (settings?.professionalValues && settings.professionalValues.length > 0)) && (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Languages */}
              {settings?.languages && settings.languages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <Languages className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {lang === 'fr' ? "Langues" : "Languages"}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {settings.languages.map((language, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">{language.name}</span>
                        <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                          {language.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Professional Values */}
              {settings?.professionalValues && settings.professionalValues.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {lang === 'fr' ? "Valeurs" : "Values"}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {settings.professionalValues.map((value, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {lang === 'fr' ? value.titleFr : value.titleEn}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lang === 'fr' ? value.descriptionFr : value.descriptionEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Work Preferences / Availability Section */}
      {settings?.workPreferences && (
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lang === 'fr' ? "Disponibilités" : "Availability"}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {settings.workPreferences.remote && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Remote
                    </span>
                  )}
                  {settings.workPreferences.hybrid && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      {lang === 'fr' ? "Hybride" : "Hybrid"}
                    </span>
                  )}
                  {settings.workPreferences.onsite && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      {lang === 'fr' ? "Sur site" : "On-site"}
                    </span>
                  )}
                  {settings.workPreferences.freelance && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Freelance
                    </span>
                  )}
                  {settings.workPreferences.cdi && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      CDI
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
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
              {lang === 'fr' ? "Travaillons ensemble !" : "Let's work together!"}
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {lang === 'fr'
                ? "Vous avez un projet en tête ? Discutons-en et créons quelque chose d'exceptionnel."
                : "Have a project in mind? Let's discuss and create something exceptional."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                  {lang === 'fr' ? "Me contacter" : "Contact me"} <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-white/30 text-white hover:bg-white/10">
                  {lang === 'fr' ? "Voir mes services" : "View my services"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
