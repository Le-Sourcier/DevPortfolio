import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Search,
  X,
  FileText,
  Folder,
  Mail,
  Home,
  Briefcase,
  BookOpen,
  Phone,
  Globe,
  Tag,
  Calendar,
  ArrowRight,
  Command,
  Hash,
  Sparkles,
  Clock,
  ExternalLink,
  User,
  GraduationCap,
  Award,
} from "lucide-react";
import { useProjects } from "../../api/projects";
import { useBlogPosts } from "../../api/blogposts";
import { useSiteSettings } from "../../api/settings";

interface SearchResult {
  id: string;
  type: "page" | "project" | "blog" | "contact" | "service";
  title: string;
  description?: string;
  url: string;
  icon: React.ElementType;
  tags?: string[];
  image?: string;
  meta?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.resolvedLanguage === "fr" ? "fr" : "en";

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const { data: projectsData } = useProjects();
  const { data: postsData } = useBlogPosts();
  const { data: settings } = useSiteSettings();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save search to recent
  const saveRecentSearch = useCallback((search: string) => {
    if (!search.trim()) return;
    setRecentSearches((prev) => {
      const updated = [search, ...prev.filter((s) => s !== search)].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Static pages
  const staticPages: SearchResult[] = useMemo(
    () => [
      {
        id: "home",
        type: "page",
        title: t("common.home"),
        description: "Page d'accueil du portfolio",
        url: "/",
        icon: Home,
      },
      {
        id: "about",
        type: "page",
        title: t("common.about"),
        description: "Mon parcours, compétences et formations",
        url: "/about",
        icon: User,
      },
      {
        id: "services",
        type: "page",
        title: t("common.services"),
        description: "Découvrez mes services de développement",
        url: "/services",
        icon: Briefcase,
      },
      {
        id: "blog",
        type: "page",
        title: t("common.blog"),
        description: "Articles et tutoriels techniques",
        url: "/blog",
        icon: BookOpen,
      },
      {
        id: "contact",
        type: "page",
        title: t("common.contact"),
        description: "Contactez-moi pour vos projets",
        url: "/contact",
        icon: Mail,
      },
      {
        id: "careers",
        type: "page",
        title: t("common.careers"),
        description: "Opportunités de carrière et offres d'emploi",
        url: "/careers",
        icon: Briefcase,
      },
    ],
    [t]
  );

  // Services
  const services: SearchResult[] = useMemo(
    () => [
      {
        id: "service-web",
        type: "service",
        title: "Développement Web Frontend",
        description: "React, Next.js, Vue.js, TypeScript",
        url: "/services#services",
        icon: Globe,
        tags: ["React", "Next.js", "Vue.js", "TypeScript"],
      },
      {
        id: "service-mobile",
        type: "service",
        title: "Applications Mobiles",
        description: "Flutter, React Native, iOS, Android",
        url: "/services#services",
        icon: Phone,
        tags: ["Flutter", "React Native", "Mobile"],
      },
      {
        id: "service-backend",
        type: "service",
        title: "Backend & API",
        description: "Node.js, NestJS, Express, GraphQL",
        url: "/services#services",
        icon: Briefcase,
        tags: ["Node.js", "NestJS", "API", "GraphQL"],
      },
      {
        id: "service-devops",
        type: "service",
        title: "DevOps & Cloud",
        description: "AWS, Docker, Kubernetes, CI/CD",
        url: "/services#services",
        icon: Folder,
        tags: ["AWS", "Docker", "Kubernetes", "DevOps"],
      },
    ],
    []
  );

  // Contact info
  const contactItems: SearchResult[] = useMemo(
    () => [
      {
        id: "contact-email",
        type: "contact",
        title: "Email",
        description: settings?.contactEmail || "yaodavidlogan02@gmail.com",
        url: `mailto:${settings?.contactEmail || "yaodavidlogan02@gmail.com"}`,
        icon: Mail,
        meta: "Envoyer un email",
      },
      {
        id: "contact-phone",
        type: "contact",
        title: "Téléphone",
        description: "+228 91 68 09 67",
        url: "tel:+22891680967",
        icon: Phone,
        meta: "Appeler",
      },
      {
        id: "contact-github",
        type: "contact",
        title: "GitHub",
        description: "Le-Sourcier",
        url: "https://github.com/Le-Sourcier",
        icon: ExternalLink,
        meta: "Voir le profil",
      },
      {
        id: "contact-linkedin",
        type: "contact",
        title: "LinkedIn",
        description: "yao-logan",
        url: "https://linkedin.com/in/yao-logan",
        icon: ExternalLink,
        meta: "Voir le profil",
      },
    ],
    [settings]
  );

  // Projects from API
  const projectResults: SearchResult[] = useMemo(() => {
    const projects = projectsData?.data || [];
    return projects.map((project: any) => ({
      id: `project-${project.id}`,
      type: "project" as const,
      title: project.title?.[lang] || project.title?.fr || "Projet",
      description: project.description?.[lang] || project.description?.fr || "",
      url: project.projectUrl || "/services",
      icon: Folder,
      tags: project.technologies || [],
      image: project.imageUrl,
    }));
  }, [projectsData, lang]);

  // Blog posts from API
  const blogResults: SearchResult[] = useMemo(() => {
    const posts = postsData?.data || [];
    return posts.map((post: any) => ({
      id: `blog-${post.id}`,
      type: "blog" as const,
      title: post.title?.[lang] || post.title?.fr || post.slug,
      description: post.summary?.[lang] || post.summary?.fr || "",
      url: `/blog/${post.slug}`,
      icon: FileText,
      tags: post.tags || [],
      image: post.imageUrl,
      meta: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("fr-FR")
        : undefined,
    }));
  }, [postsData, lang]);

  // All searchable items
  const allItems = useMemo(
    () => [
      ...staticPages,
      ...services,
      ...projectResults,
      ...blogResults,
      ...contactItems,
    ],
    [staticPages, services, projectResults, blogResults, contactItems]
  );

  // Filter results based on query
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean);

    return allItems
      .filter((item) => {
        const searchableText = [
          item.title,
          item.description,
          ...(item.tags || []),
          item.type,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
      })
      .slice(0, 10);
  }, [query, allItems]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};

    searchResults.forEach((result) => {
      if (!groups[result.type]) {
        groups[result.type] = [];
      }
      groups[result.type].push(result);
    });

    return groups;
  }, [searchResults]);

  // Flat list for keyboard navigation
  const flatResults = useMemo(() => {
    return Object.values(groupedResults).flat();
  }, [groupedResults]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flatResults.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flatResults.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[selectedIndex]) {
            handleSelect(flatResults[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, flatResults, selectedIndex, onClose]);

  // Handle selection
  const handleSelect = (result: SearchResult) => {
    saveRecentSearch(query);

    if (result.url.startsWith("http") || result.url.startsWith("mailto:") || result.url.startsWith("tel:")) {
      window.open(result.url, "_blank");
    } else {
      navigate(result.url);
    }
    onClose();
    setQuery("");
  };

  // Get type label
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      page: "Pages",
      project: "Projets",
      blog: "Articles",
      service: "Services",
      contact: "Contact",
    };
    return labels[type] || type;
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      page: "bg-blue-500",
      project: "bg-purple-500",
      blog: "bg-emerald-500",
      service: "bg-orange-500",
      contact: "bg-pink-500",
    };
    return colors[type] || "bg-gray-500";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-950 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher pages, projets, articles, services..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 text-lg"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* No query - show suggestions */}
            {!query.trim() && (
              <div className="p-4 space-y-6">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      Recherches récentes
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuery(search)}
                          className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick links */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Accès rapide
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {staticPages.map((page) => (
                      <Link
                        key={page.id}
                        to={page.url}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <page.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {page.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {page.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Search tips */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Command className="w-3.5 h-3.5" />
                    <span>
                      Tapez pour rechercher • <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑↓</kbd> pour naviguer • <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd> pour sélectionner
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Search results */}
            {query.trim() && (
              <>
                {flatResults.length === 0 ? (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Aucun résultat pour "{query}"
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      Essayez avec d'autres mots-clés
                    </p>
                  </div>
                ) : (
                  <div className="p-2">
                    {Object.entries(groupedResults).map(([type, results]) => (
                      <div key={type} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 px-3 py-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getTypeColor(
                              type
                            )}`}
                          />
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {getTypeLabel(type)}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({results.length})
                          </span>
                        </div>

                        {results.map((result) => {
                          const globalIndex = flatResults.indexOf(result);
                          const isSelected = globalIndex === selectedIndex;

                          return (
                            <button
                              key={result.id}
                              onClick={() => handleSelect(result)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-colors text-left ${
                                isSelected
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                              }`}
                            >
                              {/* Icon or Image */}
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  isSelected
                                    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {result.image ? (
                                  <img
                                    src={result.image}
                                    alt=""
                                    className="w-full h-full object-cover rounded-xl"
                                  />
                                ) : (
                                  <result.icon className="w-5 h-5" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-white truncate">
                                  {result.title}
                                </div>
                                {result.description && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {result.description}
                                  </div>
                                )}
                                {result.tags && result.tags.length > 0 && (
                                  <div className="flex items-center gap-1 mt-1">
                                    {result.tags.slice(0, 3).map((tag, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
                                      >
                                        <Hash className="w-3 h-3 mr-0.5" />
                                        {tag}
                                      </span>
                                    ))}
                                    {result.tags.length > 3 && (
                                      <span className="text-xs text-gray-400">
                                        +{result.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Meta & Arrow */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {result.meta && (
                                  <span className="text-xs text-gray-400">
                                    {result.meta}
                                  </span>
                                )}
                                <ArrowRight
                                  className={`w-4 h-4 transition-transform ${
                                    isSelected
                                      ? "text-blue-500 translate-x-1"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {query.trim() && flatResults.length > 0 && (
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{flatResults.length} résultat(s)</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">↵</kbd>
                    Ouvrir
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 rounded">↑↓</kbd>
                    Naviguer
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;
