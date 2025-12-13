import { motion } from "framer-motion";
import { X, CheckCircle, Download, Trash2 } from "lucide-react";
import React from "react";

function NotificationModat() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Paramètres des notifications
        </h3>
        <button
          onClick={() => setShowSettings(false)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Types de notifications
            </h4>
            <div className="space-y-3">
              {[
                { key: "contactMessages", name: "Messages de contact" },
                { key: "blogComments", name: "Commentaires de blog" },
                {
                  key: "systemNotifications",
                  name: "Notifications système",
                },
                { key: "backups", name: "Sauvegardes" },
                { key: "updates", name: "Mises à jour" },
              ].map((item, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-700">{item.name}</span>
                  <input
                    type="checkbox"
                    checked={
                      notificationSettings.types[
                        item.key as keyof typeof notificationSettings.types
                      ]
                    }
                    onChange={(e) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        types: {
                          ...prev.types,
                          [item.key]: e.target.checked,
                        },
                      }))
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Actions rapides
            </h4>
            <div className="space-y-3">
              <button
                onClick={() => setShowMarkAllRead(true)}
                className="w-full text-left px-4 py-3 bg-green-50 text-green-800 rounded-xl hover:bg-green-100 transition-colors duration-200 flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-3" />
                Marquer toutes comme lues
              </button>
              <button
                onClick={exportNotifications}
                className="w-full text-left px-4 py-3 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100 transition-colors duration-200 flex items-center"
              >
                <Download className="w-5 h-5 mr-3" />
                Exporter les notifications
              </button>
              <button
                onClick={() => setShowDeleteAll(true)}
                className="w-full text-left px-4 py-3 bg-red-50 text-red-800 rounded-xl hover:bg-red-100 transition-colors duration-200 flex items-center"
              >
                <Trash2 className="w-5 h-5 mr-3" />
                Supprimer toutes les notifications
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Préférences
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notifications par email
                </label>
                <select
                  value={notificationSettings.emailNotifications}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      emailNotifications: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50"
                >
                  <option value="immediate">Immédiatement</option>
                  <option value="daily">Résumé quotidien</option>
                  <option value="weekly">Résumé hebdomadaire</option>
                  <option value="never">Jamais</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sons de notification
                </label>
                <select
                  value={notificationSettings.soundNotifications}
                  onChange={(e) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      soundNotifications: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50"
                >
                  <option value="enabled">Activés</option>
                  <option value="disabled">Désactivés</option>
                  <option value="urgent">Urgentes uniquement</option>
                </select>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Mode ne pas déranger</span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.doNotDisturb}
                    onChange={(e) =>
                      setNotificationSettings((prev) => ({
                        ...prev,
                        doNotDisturb: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h5 className="text-md font-semibold text-gray-900 mb-3">
                  Statistiques
                </h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-semibold text-blue-900">
                      {notifications.length}
                    </div>
                    <div className="text-blue-700">Total</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="font-semibold text-red-900">
                      {unreadCount}
                    </div>
                    <div className="text-red-700">Non lues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-200 mt-8">
        <div className="flex items-center justify-between">
          <button
            onClick={resetSettings}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Réinitialiser
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSettings(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Annuler
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveSettings}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sauvegarder les paramètres
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NotificationModat;
