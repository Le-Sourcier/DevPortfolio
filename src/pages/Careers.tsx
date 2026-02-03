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
  X
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { useJobs } from "../api/jobs";

const Careers = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  // Filtres
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedContractType, setSelectedContractType] = useState<string>("");
  const [selectedRemoteType, setSelectedRemoteType] = useState<string>("");

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

  const categories = ["development", "design", "marketing", "management", "other"];
  const contractTypes = ["fulltime", "parttime", "contract", "freelance", "internship"];
  const remoteTypes = ["remote", "hybrid", "onsite"];

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

      {/* Open Positions Section */}
      <section id="openings" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 text-center">
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

          {/* Stats */}
          <div className="max-w-4xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{jobs.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t("careers.stats.openPositions")}</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t("careers.stats.locations")}</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t("careers.stats.teamSize")}</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 text-center border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">✓</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t("careers.stats.remoteOk")}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-950 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{t("careers.filters.category")}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {t("careers.filters.all")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {t(`careers.categories.${cat}`)}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {contractTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedContractType(selectedContractType === type ? "" : type)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedContractType === type
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {t(`careers.contractTypes.${type}`)}
                  </button>
                ))}
                {remoteTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedRemoteType(selectedRemoteType === type ? "" : type)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedRemoteType === type
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {t(`careers.remoteTypes.${type}`)}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                  {t("careers.filters.clearFilters")}
                </button>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Chargement des offres...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-950 rounded-3xl border border-gray-200 dark:border-gray-800">
                <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t("careers.filters.noResults")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("careers.filters.adjustFilters")}
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    {t("careers.filters.clearFilters")}
                  </Button>
                )}
              </div>
            ) : (
              jobs.map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="group relative bg-white dark:bg-gray-950 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap gap-3">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                            {t(`careers.categories.${job.category}`)}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" /> {t(`careers.contractTypes.${job.contractType}`)}
                          </span>
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                            {t(`careers.remoteTypes.${job.remoteType}`)}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {job.title[lang]}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {job.description[lang].substring(0, 150)}
                            {job.description[lang].length > 150 ? "..." : ""}
                          </p>
                          {job.salary && (
                            <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                              <DollarSign className="w-4 h-4" />
                              {job.salary}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0 pt-4 md:pt-0 w-full md:w-auto">
                        <Link to={`/contact?subject=Candidature: ${job.title[lang]}&projectType=other&jobId=${job.id}`}>
                          <Button className="w-full md:w-auto rounded-xl px-6 h-12 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20">
                            {t("careers.job.apply")} <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Spontaneous Application */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-12 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("careers.spontaneous.title")}
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  {t("careers.spontaneous.description")}
                </p>
                <Link to="/contact?subject=Candidature Spontanée&projectType=other">
                  <Button size="lg" className="rounded-full px-8 bg-white text-gray-900 hover:bg-gray-100 border-0">
                    {t("careers.spontaneous.cta")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
