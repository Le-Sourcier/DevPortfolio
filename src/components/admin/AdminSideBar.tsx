import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Code2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface NavSection {
  title?: string;
  links: {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export default function AdminSideBar() {
  const location = useLocation();

  const sections: NavSection[] = [
    {
      links: [
        {
          to: "/admin/dashboard",
          label: "Vue d'ensemble",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Contenu",
      links: [
        {
          to: "/admin/posts",
          label: "Articles",
          icon: FileText,
        },
        {
          to: "/admin/projects",
          label: "Projets",
          icon: Folder,
        },
      ],
    },
    {
      title: "Profil",
      links: [
        {
          to: "/admin/skills",
          label: "Compétences",
          icon: Code2,
        },
        {
          to: "/admin/experiences",
          label: "Expériences",
          icon: Briefcase,
        },
        {
          to: "/admin/education",
          label: "Formation",
          icon: GraduationCap,
        },
      ],
    },
    {
      title: "Système",
      links: [
        {
          to: "/admin/messages",
          label: "Messages",
          icon: MessageSquare,
        },
        {
          to: "/admin/settings",
          label: "Paramètres",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.links.map((link) => {
                const isActive = location.pathname.startsWith(link.to);

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                  >
                    <link.icon
                      className={cn(
                        "w-5 h-5 mr-3",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      )}
                    />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
