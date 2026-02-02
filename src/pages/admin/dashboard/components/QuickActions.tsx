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
  icon: LucideIcon;
  link: string;
}

const actions: QuickAction[] = [
  { label: "Article", icon: FileText, link: "/admin/posts" },
  { label: "Projet", icon: Folder, link: "/admin/projects" },
  { label: "Compétence", icon: Code2, link: "/admin/skills" },
  { label: "Expérience", icon: Briefcase, link: "/admin/experiences" },
  { label: "Formation", icon: GraduationCap, link: "/admin/education" },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
    >
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-medium text-gray-900 dark:text-white">
          Création rapide
        </h2>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.link}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors relative">
              <action.icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                <Plus className="w-2.5 h-2.5 text-white dark:text-gray-900" />
              </div>
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
