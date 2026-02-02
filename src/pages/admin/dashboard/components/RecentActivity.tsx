import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Folder, Briefcase, ChevronRight } from "lucide-react";
import { RecentActivityItem } from "../hooks/useDashboardData";

interface RecentActivityProps {
  activities: RecentActivityItem[];
}

const iconMap = {
  post: FileText,
  project: Folder,
  experience: Briefcase,
};

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-gray-300 dark:text-gray-600" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">Aucune activité récente</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Commencez par créer du contenu
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
    >
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-medium text-gray-900 dark:text-white">
          Activité récente
        </h2>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.type];
          return (
            <Link
              key={activity.id}
              to={activity.link}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {activity.date}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
