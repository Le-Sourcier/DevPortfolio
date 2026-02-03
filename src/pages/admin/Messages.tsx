import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Mail,
  Clock,
  CheckCircle,
  Archive,
  Trash2,
  Eye,
  Building2,
  Calendar,
  Wallet,
  X,
  Filter,
  ExternalLink,
} from "lucide-react";
import { useMessages, useUpdateMessage, useDeleteMessage, Message, MessageStatus } from "../../api/messages";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  LoadingScreen,
  ActionButton,
} from "../../components/admin/ui";

type FilterStatus = "all" | MessageStatus;

const statusConfig: Record<MessageStatus, { label: string; color: string; icon: typeof Mail }> = {
  new: {
    label: "Nouveau",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    icon: Mail,
  },
  read: {
    label: "Lu",
    color: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    icon: Eye,
  },
  replied: {
    label: "Répondu",
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    icon: CheckCircle,
  },
  archived: {
    label: "Archivé",
    color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    icon: Archive,
  },
};

const projectTypeLabels: Record<string, string> = {
  web: "Application Web",
  mobile: "Application Mobile",
  backend: "Backend / API",
  fullstack: "Solution Full-Stack",
  consulting: "Consulting / Audit",
  other: "Autre",
};

const budgetLabels: Record<string, string> = {
  small: "< 2 000 €",
  medium: "2 000 € - 5 000 €",
  large: "5 000 € - 15 000 €",
  enterprise: "> 15 000 €",
  discuss: "À discuter",
};

const timelineLabels: Record<string, string> = {
  urgent: "Urgent (< 2 semaines)",
  short: "Court terme (1-2 mois)",
  medium: "Moyen terme (2-4 mois)",
  flexible: "Flexible",
};

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data: messagesData, isLoading } = useMessages();
  const updateMessage = useUpdateMessage();
  const deleteMessage = useDeleteMessage();

  const messages = (messagesData?.data || []) as Message[];

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = filterStatus === "all" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Count by status
  const newCount = messages.filter((m) => m.status === "new").length;
  const readCount = messages.filter((m) => m.status === "read").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;
  const archivedCount = messages.filter((m) => m.status === "archived").length;

  const handleStatusChange = async (id: string, status: MessageStatus) => {
    await updateMessage.mutateAsync({ id, status });
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      await deleteMessage.mutateAsync(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const openMessage = async (message: Message) => {
    setSelectedMessage(message);
    // Mark as read if new
    if (message.status === "new") {
      await updateMessage.mutateAsync({ id: message.id, status: "read" });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffHours < 48) return "Hier";

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatFullDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
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
        title="Messages"
        description="Gérez les messages reçus via le formulaire de contact"
        count={messages.length}
        icon={MessageSquare}
      />

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setFilterStatus("new")}
          className={`text-left p-4 rounded-xl border transition-all ${
            filterStatus === "new"
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700"
              : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{newCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nouveaux</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setFilterStatus("read")}
          className={`text-left p-4 rounded-xl border transition-all ${
            filterStatus === "read"
              ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{readCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lus</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setFilterStatus("replied")}
          className={`text-left p-4 rounded-xl border transition-all ${
            filterStatus === "replied"
              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
              : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{repliedCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Répondus</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => setFilterStatus("archived")}
          className={`text-left p-4 rounded-xl border transition-all ${
            filterStatus === "archived"
              ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700"
              : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-yellow-200 dark:hover:border-yellow-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
              <Archive className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{archivedCount}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Archivés</p>
            </div>
          </div>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Rechercher par nom, email, entreprise..."
          />
        </div>
        {filterStatus !== "all" && (
          <button
            onClick={() => setFilterStatus("all")}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
            Effacer le filtre
          </button>
        )}
      </div>

      {/* Messages list */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={MessageSquare}
            title="Aucun message"
            description={
              searchTerm || filterStatus !== "all"
                ? "Aucun message ne correspond à vos critères"
                : "Les messages du formulaire de contact apparaîtront ici"
            }
          />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((message) => {
            const config = statusConfig[message.status];
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openMessage(message)}
                className={`bg-white dark:bg-gray-900 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                  message.status === "new"
                    ? "border-l-4 border-l-blue-500 border-gray-100 dark:border-gray-800"
                    : "border-gray-100 dark:border-gray-800"
                } ${selectedMessage?.id === message.id ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium text-sm">
                          {message.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-medium ${message.status === "new" ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                            {message.name}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${config.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                          </span>
                          <span className="text-xs text-gray-400">{formatDate(message.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{message.email}</p>
                        <p className={`text-sm mt-1 line-clamp-1 ${message.status === "new" ? "text-gray-900 dark:text-white font-medium" : "text-gray-600 dark:text-gray-400"}`}>
                          {message.message}
                        </p>
                        {(message.projectType || message.company) && (
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            {message.company && (
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {message.company}
                              </span>
                            )}
                            {message.projectType && (
                              <span>{projectTypeLabels[message.projectType] || message.projectType}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Message detail modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {selectedMessage.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedMessage.name}
                      </h2>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                      >
                        {selectedMessage.email}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatFullDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {/* Project details */}
                {(selectedMessage.company || selectedMessage.projectType || selectedMessage.budget || selectedMessage.timeline) && (
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    {selectedMessage.company && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Entreprise</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedMessage.company}</p>
                        </div>
                      </div>
                    )}
                    {selectedMessage.projectType && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Type de projet</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {projectTypeLabels[selectedMessage.projectType] || selectedMessage.projectType}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedMessage.budget && (
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {budgetLabels[selectedMessage.budget] || selectedMessage.budget}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedMessage.timeline && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Délai</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {timelineLabels[selectedMessage.timeline] || selectedMessage.timeline}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Message content */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Message</h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Statut:</span>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as MessageStatus)}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">Nouveau</option>
                      <option value="read">Lu</option>
                      <option value="replied">Répondu</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <ActionButton
                      variant="secondary"
                      onClick={() => handleDelete(selectedMessage.id)}
                      icon={Trash2}
                      className="!text-red-600 hover:!bg-red-50 dark:hover:!bg-red-900/20"
                    >
                      Supprimer
                    </ActionButton>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Votre demande de contact`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Répondre par email
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
