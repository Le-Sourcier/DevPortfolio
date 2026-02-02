import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  link: string;
  index: number;
}

export function StatCard({ title, value, icon: Icon, link, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={link} className="block group">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 transition-all duration-200 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
              </p>
              <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-1">
                {value}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors">
              <Icon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
