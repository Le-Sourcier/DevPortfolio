import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Folder,
  TrendingUp,
  MessageSquare,
  Settings,
  Image,
  LucideProps,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type TabPrpos = {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: string;
};
export default function AdminSideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract current tab from the query string (?tab=XYZ)
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "overview";

  const tabs: TabPrpos[] = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      icon: BarChart3,
      color: "text-blue-600",
    },
    { id: "posts", label: "Articles", icon: FileText, color: "text-green-600" },
    {
      id: "projects",
      label: "Projets",
      icon: Folder,
      color: "text-purple-600",
    },
    { id: "media", label: "Médias", icon: Image, color: "text-pink-600" },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      color: "text-indigo-600",
    },
    {
      id: "settings",
      label: "Paramètres",
      icon: Settings,
      color: "text-gray-600",
    },
  ];
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
      <nav className="space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              onClick={() => navigate(`/admin?tab=${tab.id}`)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium shadow-md border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <tab.icon
                className={`w-5 h-5 mr-3 ${
                  isActive ? tab.color : "text-gray-400"
                }`}
              />
              {tab.label}
              {tab.id === "messages" && (
                <span className="ml-auto w-2 h-2 bg-red-500 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
