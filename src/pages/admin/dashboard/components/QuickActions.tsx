import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Folder,
  Code2,
  Briefcase,
  GraduationCap,
  Plus,
  LucideIcon
} from "lucide-react";

interface QuickAction {
  label: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const actions: QuickAction[] = [
  {
    label: "Article",
    description: "Rédiger un nouvel article",
    icon: FileText,
    link: "/admin/posts"
  },
  {
    label: "Projet",
    description: "Ajouter un projet",
    icon: Folder,
    link: "/admin/projects"
  },
  {
    label: "Compétence",
    description: "Nouvelle compétence",
    icon: Code2,
    link: "/admin/skills"
  },
  {
    label: "Expérience",
    description: "Parcours professionnel",
    icon: Briefcase,
    link: "/admin/experiences"
  },
  {
    label: "Formation",
    description: "Parcours académique",
    icon: GraduationCap,
    link: "/admin/education"
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 dark:border-gray-800/80 overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-900 dark:text-white uppercase tracking-wider">
          Création rapide
        </h2>
      </div>

      {/* Actions Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-2">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.04 }}
            >
              <Link
                to={action.link}
                className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 group"
              >
                <div className="relative w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                  <action.icon className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-200 group-hover:text-gray-600 dark:group-hover:text-gray-300" strokeWidth={1.5} />

                  {/* Plus badge */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
                    <Plus className="w-2.5 h-2.5 text-white dark:text-gray-900" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
