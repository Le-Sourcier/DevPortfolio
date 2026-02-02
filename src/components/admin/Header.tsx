import { LogOut, Menu, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface AdminHeaderProps {
  onClick: () => void;
}

function AdminHeader({ onClick }: AdminHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Left side - Logo & Title */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-sm font-semibold text-white dark:text-gray-900">
                A
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
                Administration
              </h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Portfolio Manager
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              En ligne
            </span>
          </div>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={`Thème: ${theme === "light" ? "Clair" : theme === "dark" ? "Sombre" : "Système"}`}
          >
            <ThemeIcon className="w-5 h-5" />
          </button>

          {/* Logout button */}
          <button
            onClick={onClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
