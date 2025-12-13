// admin/overview
import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  Eye,
  Target,
  BarChart,
  LineChart,
  Star,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { blogPosts, projects } = useAppContext();
  const navigation = useNavigate();
  const stats = {
    totalPosts: blogPosts.length,
    totalProjects: projects.length,
    featuredPosts: blogPosts.filter((p) => p.featured).length,
    featuredProjects: projects.filter((p) => p.featured).length,
    categories: [...new Set(blogPosts.map((p) => p.category))].length,
    totalReadTime: blogPosts.reduce((acc, post) => acc + post.readTime, 0),
    totalViews: 12547,
    monthlyGrowth: 23.5,
    conversionRate: 4.2,
    avgSessionTime: "3:42",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Articles",
            value: stats.totalPosts,
            change: "+12%",
            icon: FileText,
            color: "from-blue-500 to-blue-600",
            bgColor: "from-blue-50 to-blue-100",
          },
          {
            title: "Projets",
            value: stats.totalProjects,
            change: "+8%",
            icon: Folder,
            color: "from-green-500 to-green-600",
            bgColor: "from-green-50 to-green-100",
          },
          {
            title: "Vues totales",
            value: stats.totalViews.toLocaleString(),
            change: "+23%",
            icon: Eye,
            color: "from-purple-500 to-purple-600",
            bgColor: "from-purple-50 to-purple-100",
          },
          {
            title: "Taux conversion",
            value: `${stats.conversionRate}%`,
            change: "+4.2%",
            icon: Target,
            color: "from-orange-500 to-orange-600",
            bgColor: "from-orange-50 to-orange-100",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Trafic mensuel</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                +23.5%
              </span>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <BarChart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <LineChart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Graphique en barres */}
          <div className="relative h-64 bg-gradient-to-t from-blue-50/30 to-transparent rounded-xl p-4">
            {/* Grille de référence */}
            <div className="absolute inset-4 pointer-events-none">
              {[25, 50, 75, 100].map((line) => (
                <div
                  key={line}
                  className="absolute left-0 right-0 border-t border-gray-200/40"
                  style={{ bottom: `${line}%` }}
                >
                  <span className="absolute -left-12 -top-2 text-xs text-gray-400 font-medium">
                    {line === 100
                      ? "4k"
                      : line === 75
                      ? "3k"
                      : line === 50
                      ? "2k"
                      : "1k"}
                  </span>
                </div>
              ))}
            </div>

            {/* Barres du graphique */}
            <div className="relative h-full flex items-end justify-between px-4">
              {[
                {
                  month: "Jan",
                  value: 65,
                  label: "2.1k",
                  color: "from-blue-400 to-blue-500",
                },
                {
                  month: "Fév",
                  value: 78,
                  label: "2.5k",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  month: "Mar",
                  value: 52,
                  label: "1.7k",
                  color: "from-blue-400 to-blue-500",
                },
                {
                  month: "Avr",
                  value: 85,
                  label: "2.8k",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  month: "Mai",
                  value: 92,
                  label: "3.1k",
                  color: "from-blue-600 to-blue-700",
                },
                {
                  month: "Jun",
                  value: 88,
                  label: "2.9k",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  month: "Jul",
                  value: 95,
                  label: "3.2k",
                  color: "from-blue-600 to-blue-700",
                },
              ].map((data, index) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center group relative"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                    <div className="font-semibold">{data.label} visiteurs</div>
                    <div className="text-gray-300">{data.month} 2024</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>

                  {/* Barre */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${data.value}%`, opacity: 1 }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                    className={`w-10 bg-gradient-to-t ${data.color} rounded-t-lg shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer`}
                    style={{ minHeight: "12px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Effet de brillance au survol */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Indicateur de valeur sur la barre */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {data.label}
                    </div>
                  </motion.div>

                  {/* Label du mois */}
                  <span className="text-xs text-gray-600 mt-3 font-medium group-hover:text-blue-600 transition-colors duration-200">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques en bas */}
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">18.2k</div>
                <div className="text-xs text-gray-500">Total visiteurs</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">+23.5%</div>
                <div className="text-xs text-gray-500">Croissance</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">3.2k</div>
                <div className="text-xs text-gray-500">Ce mois</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Performance</h3>
          <div className="space-y-6">
            {[
              {
                label: "Temps de session moyen",
                value: stats.avgSessionTime,
                progress: 75,
              },
              { label: "Taux de rebond", value: "32%", progress: 68 },
              {
                label: "Pages par session",
                value: "4.2",
                progress: 84,
              },
              {
                label: "Conversion",
                value: `${stats.conversionRate}%`,
                progress: 42,
              },
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {metric.label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {metric.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.progress}%` }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Articles récents
            </h3>
            <button
              onClick={() => navigation("/admin?tab=posts")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {blogPosts.slice(0, 4).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ x: 4 }}
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                {post.featured && <Star className="w-4 h-4 text-yellow-500" />}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Projets récents</h3>
            <button
              onClick={() => navigation("admin?tab=projects")}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
            >
              Voir tout
            </button>
          </div>
          <div className="space-y-4">
            {projects.slice(0, 4).map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ x: 4 }}
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {project.technologies.slice(0, 2).join(", ")}
                  </p>
                </div>
                {project.featured && (
                  <Star className="w-4 h-4 text-yellow-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
