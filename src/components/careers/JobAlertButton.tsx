import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Bell,
  Mail,
  Send,
  CheckCircle2,
  X,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useSubscribeToJobAlerts } from "../../api/applications";

interface JobAlertButtonProps {
  categories?: any[];
  showBadge?: boolean;
}

const JobAlertButton = ({ categories = [], showBadge = true }: JobAlertButtonProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertCategories, setAlertCategories] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const subscribeToAlerts = useSubscribeToJobAlerts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;

    try {
      await subscribeToAlerts.mutateAsync({
        email: alertEmail,
        categories: alertCategories,
      });

      setIsSuccess(true);

      // Reset after 3 seconds and close modal
      setTimeout(() => {
        setIsSuccess(false);
        setAlertEmail("");
        setAlertCategories([]);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to subscribe to alerts:", error);
    }
  };

  const toggleCategory = (categorySlug: string) => {
    setAlertCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(c => c !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  if (isMinimized) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          {/* Pulse Animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
          />

          {/* Button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 shadow-2xl flex items-center justify-center">
            <Bell className="w-7 h-7 text-white animate-pulse" />

            {/* Badge */}
            {showBadge && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl pointer-events-none"
          >
            {t("careers.alert.title")}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-900"></div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => !isSubmitting && setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 90 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  duration: 0.4
                }}
                className="w-full max-w-lg my-auto"
                style={{ perspective: "1000px" }}
              >
              <div className="relative bg-white dark:bg-gray-950 rounded-3xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all group"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </button>

                {/* Decorative Header */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 pb-16">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Bell className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white">
                          {t("careers.alert.modalTitle") || "Alertes Emploi"}
                        </h2>
                        <p className="text-blue-100 text-sm font-medium">
                          {t("careers.alert.modalSubtitle") || "Ne ratez aucune opportunité"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 -mt-8 relative z-10">
                  {isSuccess ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                        {t("careers.alert.success")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {t("careers.alert.successDesc")}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>{t("careers.alert.successInfo") || "Vérifiez votre boîte mail"}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Benefits */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="text-center p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {t("careers.alert.benefit1") || "Instantané"}
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                          <Award className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {t("careers.alert.benefit2") || "Personnalisé"}
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                            {t("careers.alert.benefit3") || "Gratuit"}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t("careers.alert.description")}
                      </p>

                      {/* Email Input */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                          {t("careers.alert.email")} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={alertEmail}
                            onChange={(e) => setAlertEmail(e.target.value)}
                            placeholder="votre@email.com"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium"
                            required
                          />
                        </div>
                      </div>

                      {/* Categories Selection */}
                      {categories.length > 0 && (
                        <div>
                          <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                            {t("careers.alert.categories")} <span className="text-gray-400 text-xs font-normal">({t("common.optional")})</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleCategory(cat.slug)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                  alertCategories.includes(cat.slug)
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                              >
                                {cat.name[lang] || cat.name.fr}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !alertEmail}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black text-base shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t("common.loading")}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t("careers.alert.subscribe")}
                          </>
                        )}
                      </motion.button>

                      {/* Info Text */}
                      <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                        🔒 {t("careers.alert.info")}
                      </p>
                    </form>
                  )}
                </div>
              </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default JobAlertButton;
