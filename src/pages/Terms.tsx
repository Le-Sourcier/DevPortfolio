import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText, Globe, Shield, RefreshCw, Mail, Calendar } from "lucide-react";
import SEO from "../components/common/SEO";
import { useSiteSettings } from "../api/settings";

const Terms = () => {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();

  const sections = [
    {
      icon: Globe,
      titleKey: "terms.usage.title",
      descriptionKey: "terms.usage.description",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      titleKey: "terms.intellectualProperty.title",
      descriptionKey: "terms.intellectualProperty.description",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      titleKey: "terms.liability.title",
      descriptionKey: "terms.liability.description",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: RefreshCw,
      titleKey: "terms.modifications.title",
      descriptionKey: "terms.modifications.description",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title={t("terms.seoTitle")}
        description={t("terms.seoDescription")}
        url="/terms"
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
              <FileText className="w-10 h-10" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("terms.title")}
            </h1>

            <div className="flex items-center justify-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {t("terms.lastUpdated")}: {new Date().toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("terms.intro")}
              </p>
            </motion.div>

            {/* Main Sections */}
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {t(section.titleKey)}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t(section.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {t("terms.contact.title")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t("terms.contact.description")}
                    </p>
                    <a
                      href={`mailto:${settings?.contactEmail || "contact@example.com"}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 font-medium hover:shadow-lg transition-shadow"
                    >
                      <Mail className="w-4 h-4" />
                      {settings?.contactEmail || "contact@example.com"}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
