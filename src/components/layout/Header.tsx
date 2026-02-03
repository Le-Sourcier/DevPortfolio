// components/layout/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Menu, X, Code2, Download, Moon, Sun, Search, Monitor, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useSiteSettings } from "../../api/settings";
import GlobalSearch from "./GlobalSearch";

// Theme Toggle Button Component with professional animation
const ThemeToggleButton = ({ transparent = false, className = "", t }: { transparent?: boolean; className?: string; t: (key: string) => string }) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(e);
  };

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

  const getTooltip = (t: (key: string) => string) => {
    switch (theme) {
      case 'light':
        return t('header.theme.light');
      case 'dark':
        return t('header.theme.dark');
      case 'system':
        return t('header.theme.system');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isTransitioning}
      className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${transparent
          ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20 focus:ring-offset-transparent"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-950"
        }
        ${className}`}
      aria-label={getTooltip(t)}
      title={getTooltip(t)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

const Header = () => {
  const { i18n, t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Pages with dark hero backgrounds that need transparent header
  const pagesWithHero = ['/', '/about', '/services', '/blog', '/contact', '/careers'];
  const currentPath = location.pathname.replace(/\/$/, '') || '/'; // Remove trailing slash
  const hasHero = pagesWithHero.includes(currentPath);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut for command palette (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
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
    { path: "/about", label: t('common.about') },
    { path: "/services", label: t('common.services') },
    { path: "/careers", label: t('common.careers') },
    { path: "/blog", label: t('common.blog') },
    { path: "/contact", label: t('common.contact') },
  ];

  if (location.pathname.startsWith("/admin")) return null;

  // Determine if header should be transparent (at top of page with hero)
  const isTransparent = hasHero && !scrolled && !isMenuOpen;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                isTransparent
                  ? "bg-white/20 backdrop-blur"
                  : "bg-blue-600 group-hover:bg-blue-700"
              }`}>
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isTransparent
                  ? "text-white"
                  : "bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300"
              }`}>
                {settings?.siteName || "DevPortfolio"}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isTransparent
                      ? isActive(item.path)
                        ? "text-white bg-white/20"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : isActive(item.path)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Command Palette Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center px-3 py-2 text-sm rounded-xl transition-all duration-300 ${
                  isTransparent
                    ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20"
                    : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Search className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline mr-3">{t('header.search')}</span>
                <kbd className={`hidden lg:inline-flex h-5 items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium ${
                  isTransparent
                    ? "bg-white/20 text-white/70"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  ⌘K
                </kbd>
              </button>

              <div className={`h-6 w-px mx-1 ${isTransparent ? "bg-white/20" : "bg-gray-200 dark:bg-gray-800"}`} />

              {/* Theme Toggle */}
              <ThemeToggleButton transparent={isTransparent} t={t} />

              {/* Language Toggle */}
              <button
                onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'fr' ? 'en' : 'fr')}
                className={`p-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isTransparent
                    ? "text-white/80 hover:text-white bg-white/10 hover:bg-white/20"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
              >
                {i18n.resolvedLanguage === 'fr' ? 'EN' : 'FR'}
              </button>

              {/* CV Button */}
              {settings?.cvUrlFr && (
                <button
                  onClick={downloadCV}
                  className={`ml-2 inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                    isTransparent
                      ? "bg-white text-gray-900 hover:bg-gray-100 shadow-lg shadow-white/20"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                  }`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  CV
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggleButton transparent={isTransparent} t={t} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isTransparent
                    ? "text-white bg-white/10 hover:bg-white/20"
                    : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
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
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
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
                    className="flex items-center px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <Globe className="w-5 h-5 mr-3" />
                    {i18n.resolvedLanguage === 'fr' ? 'English' : 'Français'}
                  </button>
                  {settings?.cvUrlFr && (
                    <button
                      onClick={downloadCV}
                      className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" /> {t('header.downloadCV')}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Global Search */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
