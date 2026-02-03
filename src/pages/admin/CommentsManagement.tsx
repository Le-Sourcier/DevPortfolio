import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Check, X, Trash2, Clock, Mail, User, FileText, Filter } from "lucide-react";
import { useAllComments, useUpdateCommentStatus, useDeleteComment, Comment } from "../../api/comments";
import { useBlogPosts } from "../../api/blogposts";
import { BlogPost } from "../../types/models";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  LoadingScreen,
  ActionButton,
} from "../../components/admin/ui";

type FilterStatus = "all" | "pending" | "approved" | "rejected";

const statusConfig = {
  pending: {
    label: "En attente",
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    icon: Clock,
  },
  approved: {
    label: "Approuvé",
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    icon: Check,
  },
  rejected: {
    label: "Rejeté",
    color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    icon: X,
  },
};

export default function CommentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const { data: commentsData, isLoading } = useAllComments();
  const { data: postsData } = useBlogPosts();
  const updateStatus = useUpdateCommentStatus();
  const deleteComment = useDeleteComment();

  const comments = (commentsData?.data || []) as Comment[];
  const posts = (postsData?.data || []) as BlogPost[];

  // Get post title by ID
  const getPostTitle = (blogPostId: string): string => {
    const post = posts.find((p) => p.id === blogPostId);
    return post?.title?.fr || "Article inconnu";
  };

  const getPostSlug = (blogPostId: string): string => {
    const post = posts.find((p) => p.id === blogPostId);
    return post?.slug || "";
  };

  // Filter comments
  const filteredComments = comments.filter((c) => {
    const matchesSearch =
      c.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.authorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Count by status
  const pendingCount = comments.filter((c) => c.status === "pending").length;
  const approvedCount = comments.filter((c) => c.status === "approved").length;
  const rejectedCount = comments.filter((c) => c.status === "rejected").length;

  const handleApprove = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: "approved" });
  };

  const handleReject = async (id: string) => {
    await updateStatus.mutateAsync({ id, status: "rejected" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      await deleteComment.mutateAsync(id);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Commentaires"
        description="Modérez les commentaires de vos articles"
        count={comments.length}
        icon={MessageCircle}
      />

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{pendingCount}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-500">En attente</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{approvedCount}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Approuvés</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{rejectedCount}</p>
              <p className="text-sm text-red-600 dark:text-red-500">Rejetés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher par nom, email ou contenu..."
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {(["all", "pending", "approved", "rejected"] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                filterStatus === status
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {status === "all" ? "Tous" : statusConfig[status].label}
            </button>
          ))}
        </div>
      </div>

      {/* Comments list */}
      {filteredComments.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={MessageCircle}
            title="Aucun commentaire"
            description={
              searchTerm || filterStatus !== "all"
                ? "Aucun commentaire ne correspond à vos critères"
                : "Les commentaires de vos articles apparaîtront ici"
            }
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => {
            const config = statusConfig[comment.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={comment.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium text-sm">
                          {comment.authorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.authorName}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${config.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            {comment.authorEmail}
                          </span>
                          <span>·</span>
                          <span>{formatDate(comment.createdAt!)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3 whitespace-pre-wrap">
                      {comment.content}
                    </p>

                    {/* Post link */}
                    <Link
                      to={`/blog/${getPostSlug(comment.blogPostId)}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      {getPostTitle(comment.blogPostId)}
                    </Link>

                    {/* Reply indicator */}
                    {comment.parentId && (
                      <span className="ml-3 text-sm text-gray-400 dark:text-gray-500">
                        (Réponse à un commentaire)
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {comment.status === "pending" && (
                      <>
                        <ActionButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleApprove(comment.id)}
                          loading={updateStatus.isPending}
                          icon={Check}
                          className="!bg-green-100 !text-green-700 hover:!bg-green-200 dark:!bg-green-900/30 dark:!text-green-400"
                        >
                          Approuver
                        </ActionButton>
                        <ActionButton
                          variant="secondary"
                          size="sm"
                          onClick={() => handleReject(comment.id)}
                          loading={updateStatus.isPending}
                          icon={X}
                          className="!bg-red-100 !text-red-700 hover:!bg-red-200 dark:!bg-red-900/30 dark:!text-red-400"
                        >
                          Rejeter
                        </ActionButton>
                      </>
                    )}
                    {comment.status === "rejected" && (
                      <ActionButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleApprove(comment.id)}
                        loading={updateStatus.isPending}
                        icon={Check}
                      >
                        Approuver
                      </ActionButton>
                    )}
                    {comment.status === "approved" && (
                      <ActionButton
                        variant="secondary"
                        size="sm"
                        onClick={() => handleReject(comment.id)}
                        loading={updateStatus.isPending}
                        icon={X}
                      >
                        Masquer
                      </ActionButton>
                    )}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
