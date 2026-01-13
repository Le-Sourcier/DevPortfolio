import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BellRing,
  X,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Settings,
  MessageSquare,
  AlertTriangle,
  Info,
  CheckCircle,
  User,
  Reply,
  Forward,
  Download,
} from "lucide-react";
import Modal from "../../components/ui/Modal";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  sender?: string;
  avatar?: string;
  actions?: Array<{
    label: string;
    action: () => void;
    type: "primary" | "secondary" | "danger";
  }>;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Nouveau message de contact",
      message:
        "Marie Dubois a envoyé une demande de devis pour un site e-commerce.",
      timestamp: "2024-01-15T14:30:00Z",
      read: false,
      priority: "high",
      category: "Messages",
      sender: "Marie Dubois",
      avatar: "MD",
    },
    {
      id: "2",
      type: "success",
      title: "Sauvegarde terminée",
      message: "La sauvegarde automatique s'est terminée avec succès.",
      timestamp: "2024-01-15T14:00:00Z",
      read: false,
      priority: "medium",
      category: "Système",
    },
    {
      id: "3",
      type: "warning",
      title: "Espace de stockage",
      message: "L'espace de stockage atteint 85% de sa capacité.",
      timestamp: "2024-01-15T13:45:00Z",
      read: true,
      priority: "medium",
      category: "Système",
    },
    {
      id: "4",
      type: "info",
      title: "Mise à jour disponible",
      message: "Une nouvelle version du système est disponible.",
      timestamp: "2024-01-15T12:00:00Z",
      read: true,
      priority: "low",
      category: "Système",
    },
    {
      id: "5",
      type: "message",
      title: "Commentaire sur article",
      message: 'Thomas Martin a commenté votre article "React Best Practices".',
      timestamp: "2024-01-15T11:30:00Z",
      read: false,
      priority: "medium",
      category: "Blog",
      sender: "Thomas Martin",
      avatar: "TM",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showMarkAllRead, setShowMarkAllRead] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "read" && notification.read) ||
      notification.type === filter;

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter((n) => !selectedNotifications.includes(n.id))
    );
    setSelectedNotifications([]);
    showNotification(
      "success",
      `${selectedNotifications.length} notification(s) supprimée(s)`
    );
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setShowDeleteAll(false);
    showNotification("success", "Toutes les notifications ont été supprimées");
  };

  const markAllAsReadConfirm = () => {
    markAllAsRead();
    setShowMarkAllRead(false);
    showNotification("success", "Toutes les notifications marquées comme lues");
  };

  const exportNotifications = () => {
    const dataStr = JSON.stringify(notifications, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `notifications_export_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification("success", "Export des notifications terminé");
  };

  const showNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    // Simulation d'une notification toast
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const toggleSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <X className="w-5 h-5 text-red-500" />;
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case "system":
        return <Settings className="w-5 h-5 text-gray-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50";
      default:
        return "border-l-blue-500 bg-blue-50/50";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-600 mt-2">
              Gérez toutes vos notifications en un seul endroit
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMarkAllRead(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Tout marquer lu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportNotifications}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteAll(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Tout supprimer
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteAll(true)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-fu transition-all duration-300 inline-flex items-center"
            >
              <Settings className="w-5 h-5 mr-2" />
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
          {[
            {
              label: "Total",
              value: notifications.length,
              icon: Bell,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Non lues",
              value: unreadCount,
              icon: BellRing,
              color: "from-red-500 to-red-600",
            },
            {
              label: "Messages",
              value: notifications.filter((n) => n.type === "message").length,
              icon: MessageSquare,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Système",
              value: notifications.filter((n) => n.category === "Système")
                .length,
              icon: Settings,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 text-center"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une notification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50"
            >
              <option value="all">Toutes</option>
              <option value="unread">Non lues</option>
              <option value="read">Lues</option>
              <option value="message">Messages</option>
              <option value="system">Système</option>
              <option value="success">Succès</option>
              <option value="warning">Avertissements</option>
            </select>
          </div>

          {selectedNotifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedNotifications.length} sélectionnée(s)
              </span>
              <button
                onClick={deleteSelected}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="space-y-4">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-l-4 transition-all duration-300 hover:shadow-xl ${getPriorityColor(
                notification.priority
              )} ${!notification.read ? "ring-2 ring-blue-200" : ""}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleSelection(notification.id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />

                  {notification.avatar ? (
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {notification.avatar}
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3
                        className={`text-lg font-semibold ${
                          !notification.read ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : notification.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {notification.priority === "high"
                          ? "Urgent"
                          : notification.priority === "medium"
                          ? "Moyen"
                          : "Faible"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>

                      <div className="flex items-center space-x-1">
                        {notification.read ? (
                          <button
                            onClick={() => markAsUnread(notification.id)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            title="Marquer comme non lu"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                            title="Marquer comme lu"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                        {notification.category}
                      </span>
                      {notification.sender && (
                        <span className="inline-flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {notification.sender}
                        </span>
                      )}
                    </div>

                    {notification.type === "message" && (
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200">
                          <Reply className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                          <Forward className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune notification
              </h3>
              <p className="text-gray-600">
                {searchTerm || filter !== "all"
                  ? "Aucune notification ne correspond à vos critères."
                  : "Vous n'avez aucune notification pour le moment."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modals */}
      <Modal onShow={showMarkAllRead} onClose={() => setShowMarkAllRead(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Marquer toutes comme lues
          </h3>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir marquer toutes les notifications comme lues
            ?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowMarkAllRead(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={markAllAsReadConfirm}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200"
            >
              Confirmer
            </button>
          </div>
        </div>
      </Modal>

      <Modal onShow={showDeleteAll} onClose={() => setShowDeleteAll(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Supprimer toutes les notifications
          </h3>
          <p className="text-gray-600 mb-6">
            Cette action est irréversible. Toutes vos notifications seront
            définitivement supprimées.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowDeleteAll(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Annuler
            </button>
            <button
              onClick={deleteAllNotifications}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
            >
              Supprimer tout
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Notifications;
