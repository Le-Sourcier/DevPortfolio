import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogin } from "../../api/auth";
import { useAuthStore } from "../../stores/auth";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();
  const token = useAuthStore((state) => state.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      const from = (location.state as any)?.from?.pathname || "/admin/dashboard";
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);

  // Load remembered email
  useEffect(() => {
    const remembered = localStorage.getItem("remembered_email");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("remembered_email", email);
    } else {
      localStorage.removeItem("remembered_email");
    }

    login.mutate({ email, password });
  };

  const getErrorMessage = (error: any) => {
    if (error?.response?.status === 401) {
      return "Identifiants incorrects. Vérifiez votre email et mot de passe.";
    }
    if (error?.response?.status === 429) {
      return "Trop de tentatives. Veuillez réessayer dans quelques minutes.";
    }
    if (error?.message?.includes("Network")) {
      return "Erreur de connexion. Vérifiez votre connexion internet.";
    }
    return "Une erreur est survenue. Veuillez réessayer.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-5" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-0 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              Administration
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-blue-200/70 text-sm"
            >
              Connectez-vous pour accéder au tableau de bord
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-blue-100/80 mb-2">
                Email ou Nom d'utilisateur
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email" ? "text-blue-400" : "text-blue-300/50"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin@example.com"
                  required
                  autoComplete="username"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 dark:bg-gray-800/50 border-2 text-white placeholder-blue-200/40 outline-none transition-all duration-200 ${
                    focusedField === "email"
                      ? "border-blue-500 bg-white/15"
                      : "border-white/10 hover:border-white/20"
                  }`}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-blue-100/80 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password" ? "text-blue-400" : "text-blue-300/50"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 dark:bg-gray-800/50 border-2 text-white placeholder-blue-200/40 outline-none transition-all duration-200 ${
                    focusedField === "password"
                      ? "border-blue-500 bg-white/15"
                      : "border-white/10 hover:border-white/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 hover:text-blue-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                      rememberMe
                        ? "bg-blue-500 border-blue-500"
                        : "border-white/30 group-hover:border-white/50"
                    }`}
                  >
                    {rememberMe && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className="ml-2.5 text-sm text-blue-100/70 group-hover:text-blue-100/90 transition-colors">
                  Se souvenir de moi
                </span>
              </label>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {login.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">
                    {getErrorMessage(login.error)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={login.isPending || !email || !password}
              className="w-full relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2 group overflow-hidden"
            >
              {login.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="px-8 pb-8 pt-2"
          >
            <div className="flex items-center justify-center gap-2 text-xs text-blue-200/40">
              <Lock className="w-3.5 h-3.5" />
              <span>Connexion sécurisée SSL</span>
            </div>
          </motion.div>
        </div>

        {/* Back to site link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <a
            href="/"
            className="text-sm text-blue-200/60 hover:text-blue-200 transition-colors inline-flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Retour au site
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
