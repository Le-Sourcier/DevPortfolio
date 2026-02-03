import { useLocation, Link } from "react-router-dom";
import {
  FileText,
  Folder,
  MessageSquare,
  MessageCircle,
  Settings,
  LayoutDashboard,
  Code2,
  Briefcase,
  GraduationCap,
  Users,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    items: [
      { to: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    ],
  },
  {
    title: "Contenu",
    items: [
      { to: "/admin/posts", label: "Articles", icon: FileText },
      { to: "/admin/projects", label: "Projets", icon: Folder },
      { to: "/admin/comments", label: "Commentaires", icon: MessageCircle },
    ],
  },
  {
    title: "Profil",
    items: [
      { to: "/admin/skills", label: "Compétences", icon: Code2 },
      { to: "/admin/experiences", label: "Expériences", icon: Briefcase },
      { to: "/admin/education", label: "Formation", icon: GraduationCap },
    ],
  },
  {
    title: "Recrutement",
    items: [
      { to: "/admin/jobs", label: "Offres d'emploi", icon: Users },
    ],
  },
  {
    title: "Système",
    items: [
      { to: "/admin/messages", label: "Messages", icon: MessageSquare },
      { to: "/admin/settings", label: "Paramètres", icon: Settings },
    ],
  },
];

export default function AdminSideBar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {navigation.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.to ||
                  (item.to !== "/admin/dashboard" && location.pathname.startsWith(item.to));

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive
                        ? "bg-gray-900 dark:bg-gray-700 text-white"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-800">
          <div className="w-9 h-9 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-sm font-semibold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              Admin
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Administrateur
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
