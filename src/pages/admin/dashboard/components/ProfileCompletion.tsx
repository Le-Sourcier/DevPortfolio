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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
    >
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900 dark:text-white">
            Progression
          </h2>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {percent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="h-full bg-gray-900 dark:bg-white rounded-full"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {items.map((item) => {
            const isComplete = item.count >= item.min;
            const Icon = iconMap[item.key];

            return (
              <Link
                key={item.key}
                to={item.link}
                className="group"
              >
                <div className={`p-4 rounded-xl border transition-all ${
                  isComplete
                    ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                    : "border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${
                      isComplete
                        ? "text-gray-600 dark:text-gray-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`} />
                    {isComplete && (
                      <div className="w-4 h-4 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white dark:text-gray-900" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {item.count}/{item.min}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
