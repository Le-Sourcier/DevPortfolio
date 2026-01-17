// admin/Posts

import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Plus,
  X,
  Save,
  Star,
  Eye,
  Edit3,
  Trash2,
  Clock,
  Calendar,
} from "lucide-react";
import React from "react";
import {
  useBlogPosts,
  useCreateBlogPost,
  useDeleteBlogPost,
} from "../../api/blogposts";
import { useSearchParams } from "react-router-dom";

function BlogPost() {
  const { data: apiPosts, isLoading, error } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [editingPost, setEditingPost] = React.useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState("all");

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const isPostsTab = searchParams.get("tab") === "posts";
    const isOpen = searchParams.get("open") === "true";

    if (isPostsTab && isOpen) {
      setShowNewPostForm(true);
    }
  }, [searchParams]);

  console.log("searchParams: ", searchParams);
  const [newPost, setNewPost] = React.useState({
    title: "",
    excerpt: "",
    content: "",
    slug: "",
    image: "",
    category: "",
    tags: "",
    readTime: 5,
    featured: false,
  });

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const payload = {
        title: { fr: newPost.title, en: newPost.title },
        summary: { fr: newPost.excerpt, en: newPost.excerpt },
        content: { fr: newPost.content, en: newPost.content },
        slug: newPost.slug || newPost.title.toLowerCase().replace(/\s+/g, "-"),
        author: "Admin",
        publishedAt: new Date().toISOString(),
        tags: newPost.tags ? newPost.tags.split(",").map((t) => t.trim()) : [],
        imageUrl: newPost.image || undefined,
      } as const;
      createPost.mutate(payload as any, {
        onSuccess: () => {
          setNewPost({
            title: "",
            excerpt: "",
            content: "",
            slug: "",
            image: "",
            category: "",
            tags: "",
            readTime: 5,
            featured: false,
          });
          setShowNewPostForm(false);
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-600" />
              Gestion des Articles
            </h2>
            <p className="text-gray-600 mt-2">
              Créez et gérez vos articles de blog
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50">
              <option value="all">Tous les articles</option>
              <option value="featured">Articles vedettes</option>
              <option value="draft">Brouillons</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewPostForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Nouvel article
            </motion.button>
          </div>
        </div>

        {/* Enhanced New Post Form */}
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Créer un nouvel article
              </h3>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre de l'article
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez le titre..."
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    placeholder="url-de-larticle"
                    value={newPost.slug}
                    onChange={(e) =>
                      setNewPost({ ...newPost, slug: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70">
                    <option value="">Sélectionner une catégorie</option>
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="CSS">CSS</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image de couverture
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={newPost.image}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        image: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="react, javascript, tutorial"
                    value={newPost.tags}
                    onChange={(e) =>
                      setNewPost({ ...newPost, tags: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Temps de lecture (min)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newPost.readTime}
                    onChange={(e) =>
                      setNewPost({
                        ...newPost,
                        readTime: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Extrait
              </label>
              <textarea
                placeholder="Résumé de l'article..."
                value={newPost.excerpt}
                onChange={(e) =>
                  setNewPost({ ...newPost, excerpt: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contenu
              </label>
              <textarea
                placeholder="Contenu complet de l'article..."
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                rows={8}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newPost.featured}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      featured: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Article vedette
                </span>
              </label>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddPost}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Publier l'article
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Posts List */}
        <div className="space-y-4">
          {isLoading && (
            <div className="py-4 text-center">Chargement des articles...</div>
          )}
          {error && (
            <div className="py-4 text-center text-red-600">
              Erreur lors du chargement des articles.
            </div>
          )}
          {(Array.isArray(apiPosts) ? apiPosts : [])
            .map((p) => ({
              id: p.id,
              title: p.title?.fr ?? p.slug,
              excerpt: p.summary?.fr ?? "",
              content: p.content?.fr ?? "",
              slug: p.slug,
              image: p.imageUrl ?? "",
              category: "Général",
              tags: p.tags ?? [],
              publishedAt: p.publishedAt ?? new Date().toISOString(),
              readTime: 5,
              featured: false,
            }))
            .filter(
              (post) =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterStatus === "all" ||
                  (filterStatus === "featured" && post.featured))
            )
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 rounded-xl object-cover shadow-md flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3 mr-1" />
                            Vedette
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200">
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setEditingPost(
                              editingPost === post.id ? null : post.id
                            )
                          }
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200">
                          <Edit3 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deletePost.mutate(post.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime} min
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "fr-FR"
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default BlogPost;
