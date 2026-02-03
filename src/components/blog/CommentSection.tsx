import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useComments, useCreateComment, Comment } from "../../api/comments";
import {
  MessageCircle,
  Send,
  User,
  Clock,
  Reply,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CommentSectionProps {
  blogPostId: string;
}

interface CommentFormData {
  authorName: string;
  authorEmail: string;
  content: string;
}

const initialFormData: CommentFormData = {
  authorName: "",
  authorEmail: "",
  content: "",
};

function CommentForm({
  blogPostId,
  parentId,
  onSuccess,
  onCancel,
  isReply = false,
}: {
  blogPostId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  isReply?: boolean;
}) {
  const [formData, setFormData] = useState<CommentFormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const createComment = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createComment.mutateAsync({
        blogPostId,
        parentId,
        ...formData,
      });
      setFormData(initialFormData);
      setSubmitted(true);
      onSuccess?.();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start gap-3"
      >
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-green-800 dark:text-green-300">
            Commentaire envoyé !
          </p>
          <p className="text-sm text-green-700 dark:text-green-400">
            Votre commentaire sera visible après modération.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.authorName}
            onChange={(e) =>
              setFormData({ ...formData, authorName: e.target.value })
            }
            placeholder="Votre nom"
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.authorEmail}
            onChange={(e) =>
              setFormData({ ...formData, authorEmail: e.target.value })
            }
            placeholder="votre@email.com"
            required
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Commentaire <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder={isReply ? "Votre réponse..." : "Partagez votre avis..."}
          required
          rows={isReply ? 3 : 4}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          Les commentaires sont modérés avant publication
        </p>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            disabled={createComment.isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {createComment.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Envoi...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {isReply ? "Répondre" : "Publier"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function CommentCard({
  comment,
  blogPostId,
  depth = 0,
}: {
  comment: Comment;
  blogPostId: string;
  depth?: number;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return diffMins <= 1 ? "À l'instant" : `Il y a ${diffMins} min`;
      }
      return `Il y a ${diffHours}h`;
    } else if (diffDays === 1) {
      return "Hier";
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    }
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={depth > 0 ? "ml-8 md:ml-12" : ""}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div
          className={`flex-shrink-0 ${depth > 0 ? "w-8 h-8" : "w-10 h-10"} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center`}
        >
          <span
            className={`text-white font-medium ${depth > 0 ? "text-xs" : "text-sm"}`}
          >
            {getInitials(comment.authorName)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-white">
              {comment.authorName}
            </span>
            <span className="text-gray-400 dark:text-gray-500">·</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            {depth === 0 && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Reply className="w-4 h-4" />
                Répondre
              </button>
            )}
            {hasReplies && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showReplies ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {comment.replies!.length} réponse
                {comment.replies!.length > 1 ? "s" : ""}
              </button>
            )}
          </div>

          {/* Reply form */}
          <AnimatePresence>
            {showReplyForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <CommentForm
                  blogPostId={blogPostId}
                  parentId={comment.id}
                  isReply
                  onSuccess={() => setShowReplyForm(false)}
                  onCancel={() => setShowReplyForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          <AnimatePresence>
            {showReplies && hasReplies && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 space-y-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4"
              >
                {comment.replies!.map((reply) => (
                  <CommentCard
                    key={reply.id}
                    comment={reply}
                    blogPostId={blogPostId}
                    depth={depth + 1}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function CommentSection({ blogPostId }: CommentSectionProps) {
  const { data: commentsData, isLoading } = useComments(blogPostId);
  const comments = (commentsData?.data || []) as Comment[];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Commentaires
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {comments.length > 0
              ? `${comments.length} commentaire${comments.length > 1 ? "s" : ""}`
              : "Soyez le premier à commenter"}
          </p>
        </div>
      </div>

      {/* Comment form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Laisser un commentaire
        </h3>
        <CommentForm blogPostId={blogPostId} />
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              blogPostId={blogPostId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Aucun commentaire pour le moment.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Soyez le premier à partager votre avis !
          </p>
        </div>
      )}
    </section>
  );
}
