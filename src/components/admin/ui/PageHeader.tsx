import { motion } from "framer-motion";
import { LucideIcon, Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  count?: number;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({
  title,
  description,
  count,
  icon: Icon,
  actionLabel,
  onAction,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-light text-gray-900 dark:text-white tracking-tight">
            {title}
            {typeof count === "number" && (
              <span className="ml-2 text-gray-400 dark:text-gray-500 text-lg">
                ({count})
              </span>
            )}
          </h1>
          {description && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
