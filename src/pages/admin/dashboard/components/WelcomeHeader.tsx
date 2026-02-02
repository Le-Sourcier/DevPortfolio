import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface WelcomeHeaderProps {
  totalContent: number;
  completionPercent: number;
}

export function WelcomeHeader({ totalContent, completionPercent }: WelcomeHeaderProps) {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Capitalize first letter
  const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
    >
      <div>
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-sm mb-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formattedDate}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-light text-gray-900 dark:text-white tracking-tight">
          Tableau de bord
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-2xl font-light text-gray-900 dark:text-white">
            {totalContent}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Contenus
          </p>
        </div>
        <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
        <div className="text-right">
          <p className="text-2xl font-light text-gray-900 dark:text-white">
            {completionPercent}%
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Complété
          </p>
        </div>
      </div>
    </motion.div>
  );
}
