import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBlogPosts } from "../api/blogposts";
import SEO from "../components/common/SEO";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
  Tag,
  TrendingUp,
  LayoutGrid,
  List,
  Sparkles,
  BookOpen,
  Eye,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Rss,
  Bell,
  X,
  SortAsc,
  SortDesc,
} from "lucide-react";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const { t, i18n } = useTranslation();
  const { data: apiPosts, isLoading, error } = useBlogPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';
  const apiPostList = (apiPosts?.data ?? []) as any[];

  const blogPosts = useMemo(() => {
    return apiPostList.map((p) => ({
      id: p.id,
      title: p.title?.[lang] ?? p.title?.fr ?? p.slug,
      excerpt: p.summary?.[lang] ?? p.summary?.fr ?? "",
      content: p.content?.[lang] ?? p.content?.fr ?? "",
      slug: p.slug,
      image: p.imageUrl ?? "",
      tags: (p.tags ?? []) as string[],
      publishedAt: p.publishedAt ?? new Date().toISOString(),
      readTime: Math.max(3, Math.ceil((p.content?.fr?.length || 0) / 1000)),
      views: Math.floor(Math.random() * 1000) + 100, // Placeholder
      featured: p.featured ?? false,
    }));
  }, [apiPostList, lang]);

  // Get unique tags with count
  const tagsWithCount = useMemo(() => {
    const tagMap = new Map<string, number>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [blogPosts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });

    // Sort
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return posts;
  }, [blogPosts, searchTerm, selectedTag, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Featured post (first featured or most recent)
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleTagChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setShowNewsletter(false);
    }, 3000);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO
        title="Blog"
        description="Articles sur le développement web, React, et l'écosystème Tech."
        url="/blog"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-900 to-blue-900">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Blog Technique
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Explorez le monde du{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                  développement
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto">
                Tutoriels, retours d'expérience et découvertes sur les technologies web modernes.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  placeholder="Rechercher un article..."
                  className="pl-12 pr-4 h-14 rounded-2xl shadow-xl text-lg bg-white/10 backdrop-blur border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-md mx-auto">
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                  <div className="text-2xl font-bold text-white">{blogPosts.length}</div>
                  <div className="text-sm text-white/60">Articles</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                  <div className="text-2xl font-bold text-white">{tagsWithCount.length}</div>
                  <div className="text-sm text-white/60">Catégories</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
                  <div className="text-2xl font-bold text-white">
                    {blogPosts.reduce((acc, p) => acc + p.readTime, 0)}
                  </div>
                  <div className="text-sm text-white/60">Min lecture</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && blogPosts.length > 0 && !searchTerm && !selectedTag && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Article à la une
              </h2>
            </div>

            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video md:aspect-auto relative overflow-hidden">
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/50" />
                    </div>
                  )}
                  {featuredPost.tags[0] && (
                    <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold">
                      {featuredPost.tags[0]}
                    </span>
                  )}
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString(lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime} min
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                    Lire l'article <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
              {/* Filters Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filtres
                </h3>
                {(searchTerm || selectedTag) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Tags */}
              {tagsWithCount.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Catégories
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleTagChange(null)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedTag === null
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span>Tous les articles</span>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {blogPosts.length}
                      </span>
                    </button>
                    {tagsWithCount.map(([tag, count]) => (
                      <button
                        key={tag}
                        onClick={() => handleTagChange(tag === selectedTag ? null : tag)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedTag === tag
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span>{tag}</span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View Mode & Sort */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Affichage
                </h4>

                {/* View Mode */}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-4">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4 mr-2" /> Grille
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <List className="w-4 h-4 mr-2" /> Liste
                  </button>
                </div>

                {/* Sort Order */}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button
                    onClick={() => setSortOrder("newest")}
                    className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
                      sortOrder === "newest"
                        ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <SortDesc className="w-4 h-4 mr-1" /> Récent
                  </button>
                  <button
                    onClick={() => setSortOrder("oldest")}
                    className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
                      sortOrder === "oldest"
                        ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <SortAsc className="w-4 h-4 mr-1" /> Ancien
                  </button>
                </div>
              </div>

              {/* Newsletter */}
              {showNewsletter && (
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="w-5 h-5" />
                    <h4 className="font-semibold">Newsletter</h4>
                  </div>

                  {newsletterSubmitted ? (
                    <p className="text-white/90 text-sm">
                      Merci ! Vous recevrez mes prochains articles.
                    </p>
                  ) : (
                    <>
                      <p className="text-white/80 text-sm mb-4">
                        Recevez les nouveaux articles directement dans votre boîte mail.
                      </p>
                      <form onSubmit={handleNewsletterSubmit}>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          required
                          className="mb-3 bg-white/20 border-white/30 text-white placeholder:text-white/50"
                        />
                        <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                          S'inscrire <Rss className="w-4 h-4 ml-2" />
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </aside>

            {/* Posts Grid */}
            <main className="flex-1">
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredPosts.length} article{filteredPosts.length > 1 ? "s" : ""}
                  {selectedTag && <span className="text-blue-600 dark:text-blue-400"> dans "{selectedTag}"</span>}
                  {searchTerm && <span className="text-blue-600 dark:text-blue-400"> pour "{searchTerm}"</span>}
                </p>

                {/* Mobile view toggle */}
                <div className="lg:hidden flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow text-blue-600" : "text-gray-500"}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-white dark:bg-gray-700 shadow text-blue-600" : "text-gray-500"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Posts */}
              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 animate-pulse" />
                  ))}
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun article pour le moment
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    De nouveaux contenus arrivent bientôt. Revenez nous voir !
                  </p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                  <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Essayez avec d'autres termes de recherche
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              ) : (
                <>
                  <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-6"}>
                    <AnimatePresence mode="popLayout">
                      {paginatedPosts.map((post, idx) => (
                        <motion.article
                          key={post.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 ${
                            viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col"
                          }`}
                        >
                          <Link
                            to={`/blog/${post.slug}`}
                            className={`block overflow-hidden relative ${
                              viewMode === "list" ? "w-full md:w-72 h-48 md:h-auto flex-shrink-0" : "aspect-video"
                            }`}
                          >
                            {post.image ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                              </div>
                            )}
                            {post.tags[0] && (
                              <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full shadow-sm">
                                {post.tags[0]}
                              </span>
                            )}
                          </Link>

                          <div className="flex flex-col flex-1 p-6">
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.publishedAt).toLocaleDateString(lang)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readTime} min
                              </span>
                            </div>

                            <Link to={`/blog/${post.slug}`}>
                              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                              </h2>
                            </Link>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center group-hover:gap-2 transition-all"
                              >
                                Lire l'article <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>

                              <div className="flex items-center gap-3 text-gray-400">
                                <button className="hover:text-red-500 transition-colors">
                                  <Heart className="w-4 h-4" />
                                </button>
                                <button className="hover:text-blue-500 transition-colors">
                                  <Share2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          onClick={() => setCurrentPage(i + 1)}
                          className="w-10 h-10 rounded-xl"
                        >
                          {i + 1}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="rounded-xl"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Discutons ensemble de vos idées et construisons quelque chose d'extraordinaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                  Démarrer un projet <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-white/30 text-white hover:bg-white/10">
                  Voir mes services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
