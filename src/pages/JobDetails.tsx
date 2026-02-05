import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Globe,
  Calendar,
  Users,
  Target,
  Zap,
  Award,
  Share2,
  Bookmark,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { useJob, useJobMetadata } from "../api/jobs";
import { Card, CardContent } from "../components/ui/Card";

const JobDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch job details
  const { data: jobResponse, isLoading } = useJob(slug || "");
  const job = jobResponse?.data;

  // Fetch metadata for display names
  const { data: metadataResponse } = useJobMetadata();
  const metadata = metadataResponse?.data;
  const categories = metadata?.categories || [];
  const contractTypes = metadata?.contractTypes || [];
  const remoteTypes = metadata?.remoteTypes || [];

  // Get category, contract type, and remote type details
  const category = categories.find(c => c.slug === job?.category);
  const contractType = contractTypes.find(c => c.slug === job?.contractType);
  const remoteType = remoteTypes.find(c => c.slug === job?.remoteType);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t("common.loading") || "Chargement..."}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("careers.job.notFound") || "Offre introuvable"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("careers.job.notFoundDesc") || "Cette offre n'existe pas ou a été retirée"}
          </p>
          <Link to="/careers">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("careers.job.backToList") || "Retour aux offres"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title[lang] || job.title.fr,
          text: job.description[lang] || job.description.fr,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title={`${job.title[lang] || job.title.fr} - ${t("common.careers")}`}
        description={job.description[lang] || job.description.fr}
        url={`/careers/${slug}`}
      />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <button
                onClick={() => navigate("/careers")}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold">{t("careers.job.backToList") || "Retour aux offres"}</span>
              </button>
            </motion.div>

            {/* Job Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {job.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Zap className="w-3.5 h-3.5 mr-1.5" />
                    {t("careers.job.featured") || "Featured"}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {category?.name[lang] || category?.name.fr || job.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                  <Clock className="w-3.5 h-3.5" />
                  {contractType?.name[lang] || contractType?.name.fr || job.contractType}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  <Globe className="w-3.5 h-3.5" />
                  {remoteType?.name[lang] || remoteType?.name.fr || job.remoteType}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {job.title[lang] || job.title.fr}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">{job.location}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-semibold">{job.salary}€</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">
                    {t("careers.job.posted")} {new Date(job.createdAt).toLocaleDateString(lang)}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to={`/careers/${slug}/apply`} className="flex-shrink-0">
                  <Button
                    size="lg"
                    className="rounded-xl px-8 h-14 text-lg font-bold shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    {t("careers.job.apply")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="rounded-xl px-6 h-14 border-2"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {t("careers.job.share") || "Partager"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  <Card className="p-8 border-2">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      {t("careers.job.description") || "Description du poste"}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {job.description[lang] || job.description.fr}
                    </p>
                  </Card>
                </motion.div>

                {/* Responsibilities */}
                {job.responsibilities && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-8 border-2">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        {t("careers.job.responsibilities") || "Responsabilités"}
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {job.responsibilities[lang] || job.responsibilities.fr}
                      </p>
                    </Card>
                  </motion.div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="p-8 border-2">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        {t("careers.job.requirements")}
                      </h2>
                      <ul className="space-y-3">
                        {job.requirements.map((req: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="p-8 border-2">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        {t("careers.job.benefits")}
                      </h2>
                      <ul className="space-y-3">
                        {job.benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                )}

                {/* Skills/Tags */}
                {job.tags && job.tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-8 border-2">
                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                        {t("careers.job.skills") || "Compétences recherchées"}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {job.tags.map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-white font-bold text-sm border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Apply CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl"
                  >
                    <h3 className="text-2xl font-black mb-4">
                      {t("careers.job.interestedTitle") || "Intéressé(e) ?"}
                    </h3>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      {t("careers.job.interestedDesc") || "Rejoignez notre équipe et commencez une nouvelle aventure !"}
                    </p>
                    <Link to={`/careers/${slug}/apply`} className="block">
                      <Button
                        size="lg"
                        className="w-full rounded-xl bg-white text-blue-600 hover:bg-gray-100 border-0 font-black shadow-2xl h-14"
                      >
                        <Briefcase className="w-5 h-5 mr-2" />
                        {t("careers.job.applyNow") || "Postuler maintenant"}
                      </Button>
                    </Link>
                  </motion.div>

                  {/* Job Info Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="p-6 border-2">
                      <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">
                        {t("careers.job.details") || "Détails de l'offre"}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                          <Briefcase className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">Type</div>
                            <div className="font-bold text-gray-900 dark:text-white">{contractType?.name[lang] || contractType?.name.fr}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
                          <Globe className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t("careers.filters.remote")}</div>
                            <div className="font-bold text-gray-900 dark:text-white">{remoteType?.name[lang] || remoteType?.name.fr}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase">{t("careers.filters.location")}</div>
                            <div className="font-bold text-gray-900 dark:text-white">{job.location}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;
