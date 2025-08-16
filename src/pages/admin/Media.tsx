//admin/media
import { motion } from "framer-motion";
import {
  Upload,
  Image,
  FileImage,
  FileVideo,
  Music,
  FileText,
  Camera,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

export default function Media() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Image className="w-8 h-8 mr-3 text-pink-600" />
              Gestionnaire de Médias
            </h2>
            <p className="text-gray-600 mt-2">
              Gérez vos images, vidéos et fichiers
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            Uploader des fichiers
          </motion.button>
        </div>

        {/* Media Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              type: "Images",
              count: 24,
              icon: FileImage,
              color: "from-blue-500 to-blue-600",
            },
            {
              type: "Vidéos",
              count: 8,
              icon: FileVideo,
              color: "from-purple-500 to-purple-600",
            },
            {
              type: "Audio",
              count: 12,
              icon: Music,
              color: "from-green-500 to-green-600",
            },
            {
              type: "Documents",
              count: 16,
              icon: FileText,
              color: "from-orange-500 to-orange-600",
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className={`bg-gradient-to-r ${category.color} rounded-2xl p-6 text-white shadow-lg`}
            >
              <category.icon className="w-8 h-8 mb-3" />
              <div className="text-2xl font-bold">{category.count}</div>
              <div className="text-sm opacity-90">{category.type}</div>
            </motion.div>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative group"
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
