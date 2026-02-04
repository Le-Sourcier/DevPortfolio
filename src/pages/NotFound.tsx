import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Home, Folder, BookOpen, Mail, ArrowRight, Search, Briefcase, Sparkles } from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";

const NotFound = () => {
  const { t } = useTranslation();

  const quickLinks = [
    {
      to: "/",
      icon: Home,
      label: t("notFound.backHome"),
      color: "from-blue-500 to-cyan-500",
      description: t("globalSearch.homepageDesc"),
    },
    {
      to: "/services",
      icon: Briefcase,
      label: t("common.services"),
      color: "from-purple-500 to-pink-500",
      description: t("globalSearch.servicesDesc"),
    },
    {
      to: "/blog",
      icon: BookOpen,
      label: t("notFound.readBlog"),
      color: "from-emerald-500 to-teal-500",
      description: t("globalSearch.blogDesc"),
    },
    {
      to: "/contact",
      icon: Mail,
      label: t("notFound.contactMe"),
      color: "from-orange-500 to-red-500",
      description: t("globalSearch.contactDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      <SEO
        title={t("notFound.seoTitle")}
        description={t("notFound.seoDescription")}
        url="/404"
      />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-5xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("notFound.errorBadge") || "Erreur 404"}
              </span>
            </motion.div>

            <div className="text-[150px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none filter drop-shadow-2xl">
              {t("notFound.code")}
            </div>

            {/* Floating elements with better positioning */}
            <motion.div
              className="absolute top-1/4 left-[15%] w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-[15%] w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"
              animate={{
                y: [0, 25, 0],
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-16 h-16 bg-pink-500/20 rounded-full blur-2xl"
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t("notFound.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
              {t("notFound.message")}
            </p>
            <p className="text-gray-500 dark:text-gray-500 leading-relaxed">
              {t("notFound.description")}
            </p>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
          >
            {quickLinks.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.to}
                  className="block p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-2xl group h-full"
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <link.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {link.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {link.description}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
              >
                <Home className="mr-2 w-5 h-5" />
                {t("notFound.backHome")}
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all border-2 backdrop-blur-lg"
              >
                <Mail className="mr-2 w-5 h-5" />
                {t("notFound.contactMe")}
              </Button>
            </Link>
          </motion.div>

          {/* Help text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-12 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>
              {t("notFound.searchHelp") || "Vous pouvez aussi utiliser la recherche pour trouver ce que vous cherchez"}
            </span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
