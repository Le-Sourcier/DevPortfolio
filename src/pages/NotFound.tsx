import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Home, Folder, BookOpen, Mail, ArrowRight } from "lucide-react";
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
    },
    {
      to: "/services",
      icon: Folder,
      label: t("notFound.viewProjects"),
      color: "from-purple-500 to-pink-500",
    },
    {
      to: "/blog",
      icon: BookOpen,
      label: t("notFound.readBlog"),
      color: "from-emerald-500 to-teal-500",
    },
    {
      to: "/contact",
      icon: Mail,
      label: t("notFound.contactMe"),
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <SEO
        title={t("notFound.seoTitle")}
        description={t("notFound.seoDescription")}
        url="/404"
      />

      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="text-[180px] md:text-[280px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 leading-none">
              {t("notFound.code")}
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t("notFound.title")}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              {t("notFound.message")}
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              {t("notFound.description")}
            </p>
          </motion.div>

          {/* Quick Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {quickLinks.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.to}
                  className="block p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center transform group-hover:rotate-3 transition-transform`}
                  >
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {link.label}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link to="/">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                {t("notFound.backHome")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
