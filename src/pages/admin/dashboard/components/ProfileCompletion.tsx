import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, FileText, Folder, Code2, Briefcase, GraduationCap, LucideIcon } from "lucide-react";
import { CompletionItem } from "../hooks/useDashboardData";

interface ProfileCompletionProps {
  items: CompletionItem[];
  percent: number;
}

const iconMap: Record<string, LucideIcon> = {
  posts: FileText,
  projects: Folder,
  skills: Code2,
  experiences: Briefcase,
  education: GraduationCap,
};

export function ProfileCompletion({ items, percent }: ProfileCompletionProps) {
  const isComplete = percent === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-800/80 overflow-hidden"
    >
      {/* Header with progress */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
            Progression du profil
          </h2>
          <div className="flex items-center gap-2">
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center"
              >
                <Check className="w-3 h-3 text-white dark:text-gray-900" strokeWidth={2.5} />
              </motion.div>
            )}
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tabular-nums">
              {percent}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full bg-gray-900 dark:bg-white rounded-full"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item, index) => {
            const itemComplete = item.count >= item.min;
            const Icon = iconMap[item.key];
            const progress = Math.min((item.count / item.min) * 100, 100);

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Link to={item.link} className="block group">
                  <div className={`relative p-4 rounded-xl border transition-all duration-200 ${
                    itemComplete
                      ? "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30"
                      : "border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-800/20"
                  }`}>
                    {/* Completion indicator */}
                    {itemComplete && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white dark:text-gray-900" strokeWidth={2.5} />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={`w-5 h-5 transition-colors duration-200 ${
                        itemComplete
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500"
                      }`} strokeWidth={1.5} />
                    </div>

                    {/* Label */}
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {item.label}
                    </p>

                    {/* Count */}
                    <div className="flex items-center gap-2">
                      <span className={`text-xs tabular-nums ${
                        itemComplete
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}>
                        {item.count}/{item.min}
                      </span>

                      {/* Mini progress bar */}
                      {!itemComplete && (
                        <div className="flex-1 h-0.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
