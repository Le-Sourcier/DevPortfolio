import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  totalContent: number;
  completionPercent: number;
}

export function WelcomeHeader({ totalContent, completionPercent }: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Tableau de bord
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">
        {totalContent} contenus publiés · Profil complété à {completionPercent}%
      </p>
    </motion.div>
  );
}
