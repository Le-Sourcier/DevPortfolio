// admin/overview
import { motion } from "framer-motion";
import {
  FileText,
  Folder,
  Eye,
  Target,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function AdminDashboard() {
  // Mock data - should come from API/Store
  const stats = {
    totalPosts: 12,
    totalProjects: 8,
    totalViews: 12547,
    conversionRate: 4.2,
  };

  const recentActivity = [
    { type: "post", title: "Introduction à React Server Components", date: "Il y a 2 heures", status: "Publié" },
    { type: "project", title: "E-commerce Dashboard", date: "Il y a 5 heures", status: "Mis à jour" },
    { type: "message", title: "Nouveau message de contact", date: "Il y a 1 jour", status: "Non lu" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tableau de bord</h1>
        <p className="text-gray-500 dark:text-gray-400">Vue d'ensemble de votre activité.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Articles",
            value: stats.totalPosts,
            change: "+12%",
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            title: "Projets",
            value: stats.totalProjects,
            change: "+8%",
            icon: Folder,
            color: "text-purple-600",
            bg: "bg-purple-100",
          },
          {
            title: "Vues totales",
            value: stats.totalViews.toLocaleString(),
            change: "+23%",
            icon: Eye,
            color: "text-green-600",
            bg: "bg-green-100",
          },
          {
            title: "Taux conversion",
            value: `${stats.conversionRate}%`,
            change: "+4.2%",
            icon: Target,
            color: "text-orange-600",
            bg: "bg-orange-100",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} dark:bg-opacity-20 rounded-xl flex items-center justify-center`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="dark:text-white">Activité Récente</CardTitle>
              <Button variant="outline" size="sm" className="dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-700">Voir tout</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {activity.type === "post" && <FileText size={18} />}
                        {activity.type === "project" && <Folder size={18} />}
                        {activity.type === "message" && <Activity size={18} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                      {activity.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="h-full dark:bg-gray-900 dark:border-gray-800">
             <CardHeader>
               <CardTitle className="dark:text-white">Actions Rapides</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <Link to="/admin/posts/new">
                 <Button className="w-full justify-between group dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700" variant="outline">
                   <span className="flex items-center">
                     <FileText className="w-4 h-4 mr-2" /> Nouvel article
                   </span>
                   <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                 </Button>
               </Link>
               <Link to="/admin/projects/new">
                 <Button className="w-full justify-between group dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700" variant="outline">
                   <span className="flex items-center">
                     <Folder className="w-4 h-4 mr-2" /> Nouveau projet
                   </span>
                   <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                 </Button>
               </Link>
               <Link to="/admin/settings">
                 <Button className="w-full justify-between group dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700" variant="outline">
                   <span className="flex items-center">
                     <Users className="w-4 h-4 mr-2" /> Gérer l'utilisateur
                   </span>
                   <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                 </Button>
               </Link>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
