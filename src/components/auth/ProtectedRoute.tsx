import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth";
import { motion } from "framer-motion";
import { Loader2, Shield } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  // If no token, redirect to login with the attempted location
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Loading component for auth verification
export const AuthLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Shield className="w-8 h-8 text-white" />
      </div>
      <Loader2 className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
      <p className="text-blue-200/70 text-sm">Vérification de l'authentification...</p>
    </motion.div>
  </div>
);

export default ProtectedRoute;
