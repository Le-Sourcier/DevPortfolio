import { motion } from "framer-motion";
import { Edit2, Trash2, ExternalLink, MoreHorizontal } from "lucide-react";
import { ReactNode, useState } from "react";

interface DataCardProps {
  children: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  index?: number;
}

export function DataCard({ children, onEdit, onDelete, onView, index = 0 }: DataCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete?.();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 transition-all duration-200 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setConfirmDelete(false);
      }}
    >
      {children}

      {/* Actions */}
      {(onEdit || onDelete || onView) && (
        <div
          className={`absolute top-4 right-4 flex items-center gap-1 transition-opacity duration-200 ${
            showActions ? "opacity-100" : "opacity-0"
          }`}
        >
          {onView && (
            <button
              onClick={onView}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Voir"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Modifier"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className={`p-2 rounded-lg transition-colors ${
                confirmDelete
                  ? "text-white bg-red-500 hover:bg-red-600"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
              title={confirmDelete ? "Confirmer" : "Supprimer"}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

interface DataCardTitleProps {
  children: ReactNode;
}

export function DataCardTitle({ children }: DataCardTitleProps) {
  return (
    <h3 className="text-base font-medium text-gray-900 dark:text-white pr-24 truncate">
      {children}
    </h3>
  );
}

interface DataCardDescriptionProps {
  children: ReactNode;
}

export function DataCardDescription({ children }: DataCardDescriptionProps) {
  return (
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
      {children}
    </p>
  );
}

interface DataCardMetaProps {
  children: ReactNode;
}

export function DataCardMeta({ children }: DataCardMetaProps) {
  return (
    <div className="flex items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
      {children}
    </div>
  );
}

interface DataCardTagsProps {
  tags: string[];
  max?: number;
}

export function DataCardTags({ tags, max = 4 }: DataCardTagsProps) {
  const displayTags = tags.slice(0, max);
  const remaining = tags.length - max;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {displayTags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md"
        >
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className="px-2 py-1 text-xs text-gray-400 dark:text-gray-500">
          +{remaining}
        </span>
      )}
    </div>
  );
}
