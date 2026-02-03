import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, Mail, Calendar } from "lucide-react";
import SEO from "../components/common/SEO";
import { useSiteSettings } from "../api/settings";

const Privacy = () => {
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();

  const sections = [
    {
      icon: Eye,
      titleKey: "privacy.dataCollection.title",
      descriptionKey: "privacy.dataCollection.description",
      listKey: "privacy.dataCollection.list",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      titleKey: "privacy.dataUsage.title",
      descriptionKey: "privacy.dataUsage.description",
      listKey: "privacy.dataUsage.list",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      titleKey: "privacy.rights.title",
      descriptionKey: "privacy.rights.description",
      listKey: "privacy.rights.list",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO
        title={t("privacy.seoTitle")}
        description={t("privacy.seoDescription")}
        url="/privacy"
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6">
              <Shield className="w-10 h-10" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("privacy.title")}
            </h1>

            <div className="flex items-center justify-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {t("privacy.lastUpdated")}: {new Date().toLocaleDateString()}
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
              className="mb-12 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
            >
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("privacy.intro")}
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
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
                    >
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {t(section.titleKey)}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {t(section.descriptionKey)}
                      </p>
                      <ul className="space-y-2">
                        {(t(section.listKey, { returnObjects: true }) as string[]).map(
                          (item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Cookies Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("privacy.cookies.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("privacy.cookies.description")}
                </p>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {t("privacy.contact.title")}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {t("privacy.contact.description")}
                    </p>
                    <a
                      href={`mailto:${settings?.contactEmail || "contact@example.com"}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-medium hover:shadow-lg transition-shadow"
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

export default Privacy;
