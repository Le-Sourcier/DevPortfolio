// admin/overview
import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  Eye,
  Target,
  BarChart,
  LineChart,
  BarChart3,
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
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <BarChart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <LineChart className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-xl flex items-end justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Graphique des statistiques</p>
              <p className="text-sm">Intégration Analytics à venir</p>
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
