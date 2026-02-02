// components/layout/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X, Code2, Download, Moon, Sun, Search, Monitor, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useSiteSettings } from "../../api/settings";

// Theme Toggle Button Component with professional animation
const ThemeToggleButton = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Pass the event to toggleTheme for click position capture
    toggleTheme(e);
  };

  // Icon variants for smooth transitions
  const iconVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: 180, opacity: 0 }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case 'light':
        return 'Mode clair';
      case 'dark':
        return 'Mode sombre';
      case 'system':
        return 'Thème système';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isTransitioning}
      className={`relative p-2.5 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        transition-all duration-300 hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950
        ${className}`}
      aria-label={getTooltip()}
      title={getTooltip()}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0
        hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
    </button>
  );
};

const Header = () => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const { data: settings } = useSiteSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for command palette (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const downloadCV = () => {
    const url = i18n.resolvedLanguage === 'fr' ? settings?.cvUrlFr : settings?.cvUrlEn;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const navItems = [
    { path: "/", label: t('common.home') },
    { path: "/services", label: t('common.services') },
    { path: "/blog", label: t('common.blog') },
    { path: "/contact", label: t('common.contact') },
  ];

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800"
            : "bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-gray-100 dark:border-gray-900"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                {settings?.siteName || "DevPortfolio"}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    isActive(item.path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
              >
                <Search className="w-3.5 h-3.5 mr-2" />
                <span className="mr-2">Rechercher...</span>
                <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />

              {/* Theme Toggle */}
              <ThemeToggleButton />

              {/* Language Toggle */}
              <button
                 onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'fr' ? 'en' : 'fr')}
                 className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium text-sm"
              >
                {i18n.resolvedLanguage === 'fr' ? 'EN' : 'FR'}
              </button>

              {/* CV Button */}
              {settings?.cvUrlFr && (
                <button
                  onClick={downloadCV}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  CV
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggleButton className="mr-2" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3 border-t border-gray-100 dark:border-gray-800 mt-4">
                  <button
                     onClick={() => {
                        i18n.changeLanguage(i18n.resolvedLanguage === 'fr' ? 'en' : 'fr');
                        setIsMenuOpen(false);
                     }}
                     className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200"
                  >
                    <Globe className="w-5 h-5 mr-3" />
                    {i18n.resolvedLanguage === 'fr' ? 'English' : 'Français'}
                  </button>
                  {settings?.cvUrlFr && (
                     <button
                       onClick={downloadCV}
                       className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                     >
                       <Download className="w-4 h-4 mr-2" /> Télécharger CV
                     </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Command Palette Model (Placeholders) */}
      {searchOpen && (
         <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4">
             <div onClick={() => setSearchOpen(false)} className="absolute inset-0" />
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full max-w-lg bg-white dark:bg-gray-950 rounded-xl shadow-2xl overflow-hidden relative z-10 border border-gray-200 dark:border-gray-800"
             >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
                   <Search className="w-5 h-5 text-gray-400 mr-3" />
                   <input
                     autoFocus
                     placeholder="Rechercher une page, un projet..."
                     className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                   />
                   <kbd className="ml-2 text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-1.5 py-0.5">ESC</kbd>
                </div>
                <div className="p-2">
                   <div className="text-xs font-medium text-gray-500 px-2 py-1.5 mb-1 uppercase tracking-wider">Navigation</div>
                   {navItems.map(item => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                      >
                         <Command className="w-4 h-4 mr-2 text-gray-400" />
                         {item.label}
                      </Link>
                   ))}
                </div>
             </motion.div>
         </div>
      )}
    </>
  );
};

export default Header;
