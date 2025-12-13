import { motion } from "framer-motion";
import {
  Download,
  Upload,
  RefreshCw,
  Database,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Folder,
  Image,
  Settings,
  Archive,
  Trash2,
  Eye,
  RotateCcw,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Backup() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [backups, setBackups] = useState([
    {
      id: "backup-001",
      name: "Sauvegarde automatique",
      date: "2024-01-15",
      time: "14:30",
      size: "2.4 MB",
      type: "auto",
      status: "success",
      includes: ["Articles", "Projets", "Médias", "Paramètres"],
    },
    {
      id: "backup-002",
      name: "Sauvegarde manuelle",
      date: "2024-01-14",
      time: "09:15",
      size: "2.1 MB",
      type: "manual",
      status: "success",
      includes: ["Articles", "Projets", "Paramètres"],
    },
    {
      id: "backup-003",
      name: "Sauvegarde avant mise à jour",
      date: "2024-01-12",
      time: "16:45",
      size: "2.3 MB",
      type: "manual",
      status: "success",
      includes: ["Articles", "Projets", "Médias", "Paramètres"],
    },
    {
      id: "backup-004",
      name: "Sauvegarde automatique",
      date: "2024-01-10",
      time: "14:30",
      size: "1.9 MB",
      type: "auto",
      status: "warning",
      includes: ["Articles", "Projets"],
    },
  ]);
  const [filterType, setFilterType] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const backupHistory = [
    {
      id: "backup-001",
      name: "Sauvegarde automatique",
      date: "2024-01-15",
      time: "14:30",
      size: "2.4 MB",
      type: "auto",
      status: "success",
      includes: ["Articles", "Projets", "Médias", "Paramètres"],
    },
    {
      id: "backup-002",
      name: "Sauvegarde manuelle",
      date: "2024-01-14",
      time: "09:15",
      size: "2.1 MB",
      type: "manual",
      status: "success",
      includes: ["Articles", "Projets", "Paramètres"],
    },
    {
      id: "backup-003",
      name: "Sauvegarde avant mise à jour",
      date: "2024-01-12",
      time: "16:45",
      size: "2.3 MB",
      type: "manual",
      status: "success",
      includes: ["Articles", "Projets", "Médias", "Paramètres"],
    },
    {
      id: "backup-004",
      name: "Sauvegarde automatique",
      date: "2024-01-10",
      time: "14:30",
      size: "1.9 MB",
      type: "auto",
      status: "warning",
      includes: ["Articles", "Projets"],
    },
  ];

  const backupStats = {
    totalBackups: backupHistory.length,
    totalSize: "8.7 MB",
    lastBackup: "Aujourd'hui à 14:30",
    nextAutoBackup: "Demain à 14:30",
    successRate: "98%",
  };

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);

    try {
      // Simulation de création de sauvegarde avec étapes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Créer une nouvelle sauvegarde
      const newBackup = {
        id: `backup-${Date.now()}`,
        name: "Sauvegarde manuelle",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        size: `${(Math.random() * 2 + 1.5).toFixed(1)} MB`,
        type: "manual" as const,
        status: "success" as const,
        includes: ["Articles", "Projets", "Médias", "Paramètres"],
      };

      setBackups((prev) => [newBackup, ...prev]);
      showNotification("success", "Sauvegarde créée avec succès !");
    } catch {
      showNotification("error", "Erreur lors de la création de la sauvegarde");
    }

    setIsCreatingBackup(false);
  };

  const handleRestoreBackup = async (backupId: string) => {
    setIsRestoring(true);
    setSelectedBackup(backupId);

    try {
      // Simulation de restauration
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showNotification("success", "Sauvegarde restaurée avec succès !");
    } catch {
      showNotification("error", "Erreur lors de la restauration");
    }

    setIsRestoring(false);
    setSelectedBackup(null);
  };

  const handleImport = async () => {
    setIsImporting(true);

    try {
      // Créer un input file invisible
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,.zip";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          // Simulation d'import
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const importedBackup = {
            id: `backup-imported-${Date.now()}`,
            name: `Sauvegarde importée - ${file.name}`,
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            type: "manual" as const,
            status: "success" as const,
            includes: ["Articles", "Projets", "Médias", "Paramètres"],
          };

          setBackups((prev) => [importedBackup, ...prev]);
          showNotification("success", "Sauvegarde importée avec succès !");
        }
        setIsImporting(false);
      };
      input.click();
    } catch {
      showNotification("error", "Erreur lors de l'import");
      setIsImporting(false);
    }
  };

  const handleDownload = (backup: any) => {
    // Simulation de téléchargement
    const link = document.createElement("a");
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backup)
    )}`;
    link.download = `${backup.name.replace(/\s+/g, "_")}_${backup.date}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("success", "Téléchargement démarré !");
  };

  const handleDelete = (backupId: string) => {
    setBackups((prev) => prev.filter((b) => b.id !== backupId));
    setShowDeleteConfirm(null);
    showNotification("success", "Sauvegarde supprimée !");
  };

  const handlePreview = (backupId: string) => {
    setShowPreview(backupId);
  };

  const showNotification = (
    type: "success" | "error" | "info",
    message: string
  ) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredBackups = backups.filter((backup) => {
    if (filterType === "all") return true;
    if (filterType === "auto") return backup.type === "auto";
    if (filterType === "manual") return backup.type === "manual";
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getIncludeIcon = (include: string) => {
    switch (include) {
      case "Articles":
        return <FileText className="w-4 h-4" />;
      case "Projets":
        return <Folder className="w-4 h-4" />;
      case "Médias":
        return <Image className="w-4 h-4" />;
      case "Paramètres":
        return <Settings className="w-4 h-4" />;
      default:
        return <Database className="w-4 h-4" />;
    }
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
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Database className="w-8 h-8 mr-3 text-indigo-600" />
              Gestion des Sauvegardes
            </h2>
            <p className="text-gray-600 mt-2">
              Protégez vos données avec des sauvegardes automatiques et
              manuelles
            </p>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleImport}
              disabled={isImporting}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Importer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateBackup}
              disabled={isCreatingBackup}
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center ${
                isCreatingBackup ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isCreatingBackup ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Nouvelle sauvegarde
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total sauvegardes",
              value: backups.length,
              icon: Archive,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Taille totale",
              value: `${backups
                .reduce((acc, b) => acc + parseFloat(b.size), 0)
                .toFixed(1)} MB`,
              icon: Database,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Dernière sauvegarde",
              value: backupStats.lastBackup,
              icon: Clock,
              color: "from-purple-500 to-purple-600",
            },
            {
              label: "Prochaine auto",
              value: backupStats.nextAutoBackup,
              icon: Calendar,
              color: "from-orange-500 to-orange-600",
            },
            {
              label: "Taux de succès",
              value: backupStats.successRate,
              icon: CheckCircle,
              color: "from-emerald-500 to-emerald-600",
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
              <div className="text-lg font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Progress bar si création en cours */}
        {isCreatingBackup && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <RefreshCw className="w-5 h-5 text-blue-600 animate-spin mr-3" />
                <span className="font-semibold text-blue-900">
                  Création de la sauvegarde en cours...
                </span>
              </div>
              <span className="text-sm text-blue-600">75%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 2 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
              />
            </div>
            <div className="mt-3 text-sm text-blue-700">
              Sauvegarde des articles et projets...
            </div>
          </motion.div>
        )}
      </div>

      {/* Backup History */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Historique des sauvegardes
          </h3>
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50"
            >
              <option value="all">Toutes les sauvegardes</option>
              <option value="auto">Automatiques uniquement</option>
              <option value="manual">Manuelles uniquement</option>
            </select>
            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredBackups.map((backup, index) => (
            <motion.div
              key={backup.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {getStatusIcon(backup.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {backup.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          backup.type === "auto"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {backup.type === "auto" ? "Automatique" : "Manuelle"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {backup.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {backup.time}
                      </div>
                      <div className="flex items-center">
                        <Database className="w-4 h-4 mr-1" />
                        {backup.size}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {backup.includes.map((include) => (
                        <span
                          key={include}
                          className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                        >
                          {getIncludeIcon(include)}
                          <span className="ml-1">{include}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePreview(backup.id)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                    title="Prévisualiser"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(backup)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200"
                    title="Télécharger"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRestoreBackup(backup.id)}
                    disabled={isRestoring && selectedBackup === backup.id}
                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-200 disabled:opacity-50"
                    title="Restaurer"
                  >
                    {isRestoring && selectedBackup === backup.id ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <RotateCcw className="w-5 h-5" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDeleteConfirm(backup.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "100%" }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: "100%" }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border ${
              notification.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : notification.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === "success" && (
                <CheckCircle className="w-5 h-5" />
              )}
              {notification.type === "error" && (
                <AlertTriangle className="w-5 h-5" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Supprimer la sauvegarde
                </h3>
                <p className="text-gray-600 mb-6">
                  Êtes-vous sûr de vouloir supprimer cette sauvegarde ? Cette
                  action est irréversible.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleDelete(showDeleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const backup = backups.find((b) => b.id === showPreview);
                return backup ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Aperçu de la sauvegarde
                      </h3>
                      <button
                        onClick={() => setShowPreview(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Nom
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {backup.name}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Date
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {backup.date} à {backup.time}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Taille
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {backup.size}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Type
                          </label>
                          <p className="text-lg font-semibold text-gray-900">
                            {backup.type === "auto"
                              ? "Automatique"
                              : "Manuelle"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          Contenu inclus
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {backup.includes.map((include) => (
                            <span
                              key={include}
                              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {getIncludeIcon(include)}
                              <span className="ml-1">{include}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => {
                              handleDownload(backup);
                              setShowPreview(null);
                            }}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </button>
                          <button
                            onClick={() => {
                              handleRestoreBackup(backup.id);
                              setShowPreview(null);
                            }}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition-colors duration-200 inline-flex items-center justify-center"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restaurer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Configuration */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Configuration des sauvegardes
        </h3>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Fréquence des sauvegardes automatiques
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50">
                <option>Quotidienne</option>
                <option>Hebdomadaire</option>
                <option>Mensuelle</option>
                <option>Désactivée</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Heure de sauvegarde
              </label>
              <input
                type="time"
                defaultValue="14:30"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nombre de sauvegardes à conserver
              </label>
              <input
                type="number"
                defaultValue="10"
                min="1"
                max="50"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Éléments à inclure
              </label>
              <div className="space-y-3">
                {[
                  { name: "Articles de blog", checked: true },
                  { name: "Projets", checked: true },
                  { name: "Médias", checked: true },
                  { name: "Paramètres", checked: true },
                  { name: "Messages", checked: false },
                ].map((item, index) => (
                  <label key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{item.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">Notifications par email</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </label>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-gray-700">
                  Compression des sauvegardes
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sauvegarder la configuration
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
