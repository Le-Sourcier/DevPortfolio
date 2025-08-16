// admin/analytics
import { motion } from "framer-motion";
import {
  Activity,
  Clock,
  Eye,
  PieChart,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";

function Anallytics() {
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
              <TrendingUp className="w-8 h-8 mr-3 text-orange-600" />
              Analytics Avancées
            </h2>
            <p className="text-gray-600 mt-2">
              Analysez les performances de votre portfolio
            </p>
          </div>

          <div className="flex space-x-4">
            <select className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white/50">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
              <option>3 derniers mois</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </motion.button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Visiteurs uniques",
              value: "2,847",
              change: "+12.5%",
              icon: Users,
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Pages vues",
              value: "8,924",
              change: "+8.2%",
              icon: Eye,
              color: "from-green-500 to-green-600",
            },
            {
              title: "Taux de rebond",
              value: "32.4%",
              change: "-5.1%",
              icon: Activity,
              color: "from-purple-500 to-purple-600",
            },
            {
              title: "Temps moyen",
              value: "3:42",
              change: "+15.3%",
              icon: Clock,
              color: "from-orange-500 to-orange-600",
            },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}
                >
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.change.startsWith("+")
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Trafic par source
            </h3>
            <div className="h-64 flex items-center justify-center">
              <PieChart className="w-24 h-24 text-gray-300" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Pages populaires
            </h3>
            <div className="space-y-4">
              {[
                { page: "/accueil", views: 1247, percentage: 85 },
                { page: "/services", views: 892, percentage: 60 },
                { page: "/blog", views: 634, percentage: 43 },
                { page: "/contact", views: 421, percentage: 29 },
              ].map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {page.page}
                      </span>
                      <span className="text-sm text-gray-600">
                        {page.views} vues
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${page.percentage}%` }}
                        transition={{
                          delay: index * 0.2,
                          duration: 1,
                        }}
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Anallytics;
