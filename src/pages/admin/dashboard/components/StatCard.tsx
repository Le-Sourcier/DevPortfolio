import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
    >
      <Link to={link} className="block group">
        <div className="relative bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-100/80 dark:border-gray-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-0.5 max-w-[200px]">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-800/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center transition-colors duration-300 group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-700 transition-all duration-300 group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

            <div>
              <p className="text-3xl font-extralight text-gray-900 dark:text-white tracking-tight">
                {value}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-normal">
                {title}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
