import React from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/auth";
import { useLogin } from "../../api/auth";
import {
  Plus,
  FileText,
  Folder,
  BarChart3,
  Lock,
  TrendingUp,
  Mail,
  Download,
} from "lucide-react";
import AdminHeader from "../../components/admin/Header";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useNavigate } from "react-router-dom";
import AdminTabs from "../admin/AdminTabs";

const AdminLayout = () => {
  const token = useAuthStore((s) => s.token);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const login = useLogin();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Check if user has admin access
  if (!token) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative z-10 text-center p-12 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-md mx-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-4">
            Accès Administrateur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-blue-100 mb-8 leading-relaxed">
            Cette section est réservée aux administrateurs. Veuillez vous
            connecter pour accéder au panneau d'administration avancé.
          </motion.p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login.mutate({ email, password });
            }}
            className="space-y-4">
            <div className="text-left">
              <label className="block text-sm text-blue-100 mb-1">
                Email ou Nom d'utilisateur
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-blue-200 outline-none"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email ou nom d'utilisateur"
                required
              />
            </div>
            <div className="text-left">
              <label className="block text-sm text-blue-100 mb-1">
                Mot de passe
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-blue-200 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
              disabled={login.isPending}>
              {login.isPending ? "Connexion..." : "Se connecter"}
            </motion.button>
            {login.isError && (
              <div className="text-red-300 text-sm">
                Échec de connexion. Vérifiez vos identifiants.
              </div>
            )}
          </form>
        </motion.div>
      </div>
    );
  }

  const recentActivities = [
    {
      type: "post",
      action: "Nouvel article publié",
      title: "React Best Practices",
      time: "2h",
      icon: FileText,
      color: "text-green-600",
    },
    {
      type: "project",
      action: "Projet mis à jour",
      title: "E-commerce Platform",
      time: "4h",
      icon: Folder,
      color: "text-blue-600",
    },
    {
      type: "message",
      action: "Nouveau message",
      title: "Contact client",
      time: "6h",
      icon: Mail,
      color: "text-purple-600",
    },
    {
      type: "analytics",
      action: "Pic de trafic détecté",
      title: "+150% visiteurs",
      time: "1j",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      label: "Nouvel article",
      icon: Plus,
      action: () => navigate("/admin?tab=posts&open=true"),
      color: "bg-green-500",
    },
    {
      label: "Nouveau projet",
      icon: Folder,
      action: () => navigate("/admin?tab=projects&open=true"),
      color: "bg-blue-500",
    },
    {
      label: "Backup",
      icon: Download,
      action: () => navigate("/admin?tab=backup"),
      color: "bg-purple-500",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      action: () => navigate("/admin?tab=analytics"),
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
      {/* Enhanced Header */}

      <AdminHeader onClick={clearAuth} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Enhanced Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Navigation */}
              <AdminSideBar />

              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions rapides
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={action.action}
                      className={`${action.color} text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center space-y-2`}>
                      <action.icon className="w-6 h-6" />
                      <span className="text-xs font-medium text-center">
                        {action.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Activité récente
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color
                          .replace("text-", "bg-")
                          .replace("-600", "-100")}`}>
                        <activity.icon
                          className={`w-4 h-4 ${activity.color}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AdminTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
