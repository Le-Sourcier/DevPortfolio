import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPost, useBlogPosts } from "../api/blogposts";
import { useSiteSettings } from "../api/settings";
import { BlogPost as BlogPostType, BLOG_CATEGORIES, BlogCategory } from "../types/models";
import { MarkdownRenderer } from "../components/ui/MarkdownRenderer";
import { CommentSection } from "../components/blog/CommentSection";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  BookOpen,
  Github,
  Mail,
  ExternalLink,
} from "lucide-react";

const getCategoryLabel = (category: BlogCategory, lang: "fr" | "en" = "fr"): string => {
  const cat = BLOG_CATEGORIES.find((c) => c.value === category);
  return lang === "fr" ? cat?.labelFr || category : cat?.labelEn || category;
};

const getCategoryColor = (category: BlogCategory): string => {
  const colors: Record<BlogCategory, string> = {
    tutorial: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
    news: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
    project: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    thoughts: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  };
  return colors[category] || colors.tutorial;
};

// Estimate reading time based on word count
const estimateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: apiPost, isLoading, error } = useBlogPost(slug || "");
  const { data: apiPosts } = useBlogPosts();
  const { data: settings } = useSiteSettings();

  // Get post data from API
  const post = apiPost?.data as BlogPostType | undefined;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center px-4">
          <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Article non trouvé
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts from same category or with matching tags
  const allPosts = (apiPosts?.data || []) as BlogPostType[];
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.status === "published" &&
        (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag)))
    )
    .slice(0, 3);

  const readTime = estimateReadTime(post.content.fr);
  const shareUrl = window.location.href;
  const shareTitle = post.title.fr;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(post.category)}`}
            >
              {getCategoryLabel(post.category)}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title.fr}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.summary.fr}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{readTime} min de lecture</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Partager:
              </span>
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                title="Copier le lien"
              >
                <Link2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={post.imageUrl}
              alt={post.title.fr}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Article Content - Rendered Markdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <MarkdownRenderer content={post.content.fr} />
        </motion.div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center mb-4">
              <Tag className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative overflow-hidden rounded-2xl mb-12"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {post.author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-200 dark:text-blue-400 text-sm font-medium">Écrit par</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {post.author}
                </h3>
                <p className="text-blue-100 dark:text-gray-300 leading-relaxed mb-4 max-w-2xl">
                  {settings?.heroSubtitle?.fr || "Développeur passionné partageant ses connaissances et expériences à travers des articles techniques et des tutoriels."}
                </p>

                {/* Social links & CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  {settings?.githubUrl && (
                    <a
                      href={settings.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all border border-white/10 hover:border-white/20"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {settings?.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all border border-white/10 hover:border-white/20"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {settings?.twitterUrl && (
                    <a
                      href={settings.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all border border-white/10 hover:border-white/20"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 rounded-lg text-blue-700 text-sm font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-4 h-4" />
                    Me contacter
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Disponibilité */}
            {settings?.availableForWork && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  <span className="text-green-300 text-sm font-medium">
                    Disponible pour de nouveaux projets
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Articles similaires
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez d'autres articles qui pourraient vous intéresser
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300 group"
                >
                  {relatedPost.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title.fr}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(relatedPost.category)}`}
                        >
                          {getCategoryLabel(relatedPost.category)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">
                        {new Date(relatedPost.publishedAt).toLocaleDateString("fr-FR")}
                      </span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{estimateReadTime(relatedPost.content.fr)} min</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {relatedPost.title.fr}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                      {relatedPost.summary.fr}
                    </p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                    >
                      Lire l'article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <CommentSection blogPostId={post.id} />
    </div>
  );
};

export default BlogPost;
