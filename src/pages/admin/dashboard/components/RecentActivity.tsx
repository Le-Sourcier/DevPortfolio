import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Folder, Briefcase, ArrowRight, Inbox } from "lucide-react";
import { RecentActivityItem } from "../hooks/useDashboardData";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

const iconMap = {
  post: FileText,
  project: Folder,
  experience: Briefcase,
};

const labelMap = {
  post: "Article",
  project: "Projet",
  experience: "Expérience",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-800/80 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
          Activité récente
        </h2>
      </div>

      {/* Content */}
      {activities.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
            <Inbox className="w-6 h-6 text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aucune activité récente
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Vos derniers contenus apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            const label = labelMap[activity.type];

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <Link
                  to={activity.link}
                  className="flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-gray-50/80 dark:hover:bg-gray-800/30 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                    <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                      {activity.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {label}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {activity.date}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-700 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
