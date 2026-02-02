import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative w-10 h-10 mx-auto mb-3">
          <div className="absolute inset-0 rounded-full border-2 border-gray-100 dark:border-gray-800" />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-400 dark:border-t-gray-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Chargement...
        </p>
      </motion.div>
    </div>
  );
}
