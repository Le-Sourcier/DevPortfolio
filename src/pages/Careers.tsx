import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Users,
  Coffee,
  Globe,
  Rocket,
  Code2,
  CheckCircle2,
  DollarSign,
  Filter,
  X,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { useJobs, useJobMetadata } from "../api/jobs";

const Careers = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedContractType, setSelectedContractType] = useState<string>("");
  const [selectedRemoteType, setSelectedRemoteType] = useState<string>("");

  // Récupérer les métadonnées (catégories, types de contrat, types remote)
  const { data: metadataResponse, isLoading: isLoadingMetadata } = useJobMetadata();
  const metadata = metadataResponse?.data;

  const categories = metadata?.categories || [];
  const contractTypes = metadata?.contractTypes || [];
  const remoteTypes = metadata?.remoteTypes || [];

  // Récupérer les jobs
  const { data: jobsData, isLoading } = useJobs({
    status: "published",
    category: selectedCategory || undefined,
    contractType: selectedContractType || undefined,
    remoteType: selectedRemoteType || undefined,
  });

  const jobs = jobsData?.data || [];
  const hasActiveFilters = selectedCategory || selectedContractType || selectedRemoteType;

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedContractType("");
    setSelectedRemoteType("");
  };

  const benefits = [
    {
      icon: Globe,
      titleKey: "careers.benefits.remote.title",
      descKey: "careers.benefits.remote.description"
    },
    {
      icon: Clock,
      titleKey: "careers.benefits.flexible.title",
      descKey: "careers.benefits.flexible.description"
    },
    {
      icon: Rocket,
      titleKey: "careers.benefits.innovative.title",
      descKey: "careers.benefits.innovative.description"
    },
    {
      icon: Users,
      titleKey: "careers.benefits.collaborative.title",
      descKey: "careers.benefits.collaborative.description"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title={t("careers.hero.title") + " " + t("careers.hero.highlight")}
        description={t("careers.hero.subtitle")}
        url="/careers"
      />

      {/* Hero Section - Immersive */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -top-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 -top-20 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("careers.hiringTag")}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {t("careers.hero.title")} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {t("careers.hero.highlight")}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t("careers.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/20"
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t("careers.cta.viewOpenings")} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur">
                    {t("careers.cta.culture")}
                  </Button>
                </Link>
              </div>
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

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
              {t("careers.benefits.tag")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("careers.benefits.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("careers.benefits.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(benefit.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(benefit.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section with Sidebar */}
      <section id="openings" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-6xl mx-auto mb-12 text-center">
             <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                {t("careers.openings.tag")}
              </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("careers.openings.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t("careers.openings.subtitle")}
            </p>
          </div>

          {/* Sidebar + Content Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[340px,1fr] gap-8">
              {/* Sidebar */}
              <aside className="space-y-6">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Stats Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      {t("careers.stats.title") || "Statistiques"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{jobs.length}</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-1 font-medium">{t("careers.stats.openPositions")}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3+</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-1 font-medium">{t("careers.stats.locations")}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-200 dark:border-emerald-800">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">10+</div>
                        <div className="text-xs text-gray-700 dark:text-gray-300 mt-1 font-medium">{t("careers.stats.teamSize")}</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800">
                        <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-1" />
                        <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">{t("careers.stats.remoteOk")}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Filters Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-500" />
                        {t("careers.filters.category") || "Filtres"}
                      </h3>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 font-medium"
                        >
                          <X className="w-3.5 h-3.5" />
                          {t("careers.filters.clearFilters")}
                        </button>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div className="mb-5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        📁 {t("careers.filters.category")}
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        disabled={isLoadingMetadata}
                      >
                        <option value="">{t("careers.filters.all")}</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>
                            {cat.name[lang] || cat.name.fr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Contract Type Filter */}
                    <div className="mb-5">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        📝 {t("careers.filters.type")}
                      </label>
                      <select
                        value={selectedContractType}
                        onChange={(e) => setSelectedContractType(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        disabled={isLoadingMetadata}
                      >
                        <option value="">{t("careers.filters.all")}</option>
                        {contractTypes.map((type) => (
                          <option key={type.id} value={type.slug}>
                            {type.name[lang] || type.name.fr}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Remote Type Filter */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        🌍 {t("careers.filters.remote")}
                      </label>
                      <select
                        value={selectedRemoteType}
                        onChange={(e) => setSelectedRemoteType(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        disabled={isLoadingMetadata}
                      >
                        <option value="">{t("careers.filters.all")}</option>
                        {remoteTypes.map((type) => (
                          <option key={type.id} value={type.slug}>
                            {type.name[lang] || type.name.fr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>

                  {/* CTA Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur mb-4">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
                      {t("careers.sidebar.spontaneousTitle") || "Pas de poste idéal ?"}
                    </h3>
                    <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                      {t("careers.sidebar.spontaneousDesc") || "Envoyez-nous votre candidature spontanée"}
                    </p>
                    <Link to="/contact?subject=Candidature Spontanée&projectType=other" className="block">
                      <Button className="w-full rounded-xl bg-white text-blue-600 hover:bg-gray-100 border-0 font-semibold shadow-lg">
                        <Award className="w-4 h-4 mr-2" />
                        {t("careers.sidebar.spontaneous") || "Postuler"}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </aside>

              {/* Main Content - Job Listings */}
              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des offres...</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800"
                  >
                    <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t("careers.filters.noResults")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t("careers.filters.adjustFilters")}
                    </p>
                    {hasActiveFilters && (
                      <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                        <X className="w-4 h-4 mr-2" />
                        {t("careers.filters.clearFilters")}
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  jobs.map((job: any, idx: number) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="group relative bg-white dark:bg-gray-950 rounded-2xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                          <div className="space-y-4 flex-1">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                                {categories.find(c => c.slug === job.category)?.name[lang] || job.category}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-4 h-4" /> {job.location || "Remote"}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-4 h-4" /> {contractTypes.find(c => c.slug === job.contractType)?.name[lang] || job.contractType}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {job.title?.[lang] || job.title?.fr || "Poste"}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                {job.description?.[lang] || job.description?.fr || ""}
                              </p>
                              {job.tags && job.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {job.tags.map((tag: string, i: number) => (
                                    <span key={i} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-md">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex-shrink-0 pt-4 md:pt-0 w-full md:w-auto">
                            <Link to={`/contact?subject=Candidature: ${job.title?.[lang] || job.title?.fr}&projectType=other`}>
                              <Button className="w-full md:w-auto rounded-xl px-6 h-12 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                {t("careers.job.apply")} <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
