import React from "react";
import { motion } from "framer-motion";
import { useLogin } from "../../api/auth";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const login = useLogin();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
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
        className="relative z-10 text-center p-12 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/50 max-w-md w-full mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <Lock className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Accès Administrateur
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-blue-100 mb-8 leading-relaxed"
        >
          Cette section est réservée aux administrateurs. Connectez-vous pour
          accéder au panneau de gestion.
        </motion.p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate({ email, password });
          }}
          className="space-y-4"
        >
          <div className="text-left">
            <label className="block text-sm text-blue-100 dark:text-gray-300 mb-1">
              Email ou Nom d'utilisateur
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 text-white placeholder-blue-200 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email ou nom d'utilisateur"
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-sm text-blue-100 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700 text-white placeholder-blue-200 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
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
            disabled={login.isPending}
          >
            {login.isPending ? "Connexion..." : "Se connecter"}
          </motion.button>
          {login.isError && (
            <div className="text-red-300 text-sm mt-2">
              Identifiants incorrects. Veuillez réessayer.
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
