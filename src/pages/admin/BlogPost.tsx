import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Calendar, Eye, EyeOff } from "lucide-react";
import { useBlogPosts, useDeleteBlogPost } from "../../api/blogposts";
import { BlogPost as BlogPostModel, BLOG_CATEGORIES, BlogCategory } from "../../types/models";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  DataCard,
  DataCardTitle,
  DataCardDescription,
  DataCardMeta,
  DataCardTags,
  LoadingScreen,
} from "../../components/admin/ui";

const getCategoryLabel = (category: BlogCategory): string => {
  return BLOG_CATEGORIES.find(c => c.value === category)?.labelFr || category;
};

const getCategoryColor = (category: BlogCategory): string => {
  const colors: Record<BlogCategory, string> = {
    tutorial: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    news: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    project: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    thoughts: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
  };
  return colors[category];
};

export default function BlogPostManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<BlogCategory | "all">("all");

  const { data: postsData, isLoading } = useBlogPosts();
  const deletePost = useDeleteBlogPost();

  const posts = (postsData?.data || []) as BlogPostModel[];
  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    await deletePost.mutateAsync(id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Articles"
        description="Gérez vos articles de blog"
        count={posts.length}
        icon={FileText}
        actionLabel="Nouvel article"
        onAction={() => navigate("/admin/posts/new")}
      />

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher un article..."
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              filterCategory === "all"
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Tous
          </button>
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilterCategory(cat.value)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterCategory === cat.value
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat.labelFr}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={FileText}
            title="Aucun article"
            description={searchTerm || filterCategory !== "all" ? "Aucun article ne correspond à vos critères" : "Commencez par rédiger votre premier article"}
            actionLabel="Créer un article"
            onAction={() => navigate("/admin/posts/new")}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <DataCard
              key={post.id}
              index={index}
              onEdit={() => navigate(`/admin/posts/${post.id}`)}
              onDelete={() => handleDelete(post.id)}
            >
              {/* Status & Category badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(post.category)}`}>
                  {getCategoryLabel(post.category)}
                </span>
                {post.status === "draft" ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                    <EyeOff className="w-3 h-3" />
                    Brouillon
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                    <Eye className="w-3 h-3" />
                    Publié
                  </span>
                )}
              </div>

              <DataCardTitle>{post.title.fr}</DataCardTitle>
              <DataCardDescription>{post.summary.fr}</DataCardDescription>

              <DataCardMeta>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
                <span>·</span>
                <span className="text-gray-500 dark:text-gray-400">/{post.slug}</span>
              </DataCardMeta>

              {post.tags.length > 0 && (
                <DataCardTags tags={post.tags} />
              )}
            </DataCard>
          ))}
        </div>
      )}
    </div>
  );
}
