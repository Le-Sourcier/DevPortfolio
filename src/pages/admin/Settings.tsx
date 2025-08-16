//admin/settings
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Users,
  Palette,
  Shield,
  Database,
  Download,
  Upload,
  RefreshCw,
  Save,
} from "lucide-react";

function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-gray-600" />
          Paramètres Avancés
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-600" />
                Informations générales
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    defaultValue="DevPortfolio"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Développeur Full-Stack passionné par la création d'expériences web exceptionnelles"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Réseaux sociaux
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    placeholder="https://twitter.com/username"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-purple-600" />
                Apparence
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thème
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white/50">
                    <option>Clair</option>
                    <option>Sombre</option>
                    <option>Automatique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex space-x-3">
                    {[
                      "bg-blue-500",
                      "bg-purple-500",
                      "bg-green-500",
                      "bg-orange-500",
                      "bg-pink-500",
                    ].map((color, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 ${color} rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-red-600" />
                Sécurité & Notifications
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Notifications par email</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Statistiques publiques</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Mode maintenance</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">Sauvegarde automatique</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                </label>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-2 text-indigo-600" />
                Données & Sauvegarde
              </h3>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Exporter les données
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Importer des données
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Créer une sauvegarde
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 mt-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Dernière sauvegarde: Aujourd'hui à 14:30
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Sauvegarder tous les paramètres
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Settings;
