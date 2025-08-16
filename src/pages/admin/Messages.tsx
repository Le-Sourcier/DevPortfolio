//admin/messages
import { motion } from "framer-motion";
import { MessageSquare, Mail, Clock, CheckCircle, Archive } from "lucide-react";

function Messages() {
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
              <MessageSquare className="w-8 h-8 mr-3 text-indigo-600" />
              Centre de Messages
            </h2>
            <p className="text-gray-600 mt-2">
              Gérez vos communications clients
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-indigo-100 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              <span className="text-sm text-indigo-700 font-medium">
                3 nouveaux
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Nouveau message
            </motion.button>
          </div>
        </div>

        {/* Message Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Non lus",
              count: 3,
              icon: Mail,
              color: "bg-red-500",
            },
            {
              title: "En cours",
              count: 7,
              icon: Clock,
              color: "bg-yellow-500",
            },
            {
              title: "Résolus",
              count: 24,
              icon: CheckCircle,
              color: "bg-green-500",
            },
            {
              title: "Archivés",
              count: 156,
              icon: Archive,
              color: "bg-gray-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 text-center"
            >
              <div
                className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {stat.count}
              </div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {[
            {
              name: "Marie Dubois",
              email: "marie@example.com",
              subject: "Demande de devis pour site e-commerce",
              time: "2h",
              status: "new",
              priority: "high",
            },
            {
              name: "Thomas Martin",
              email: "thomas@startup.com",
              subject: "Question sur vos services de développement mobile",
              time: "4h",
              status: "replied",
              priority: "medium",
            },
            {
              name: "Sophie Laurent",
              email: "sophie@agency.fr",
              subject: "Collaboration sur projet React",
              time: "1j",
              status: "pending",
              priority: "low",
            },
            {
              name: "Pierre Durand",
              email: "pierre@tech.com",
              subject: "Maintenance site web existant",
              time: "2j",
              status: "resolved",
              priority: "medium",
            },
          ].map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-300 cursor-pointer ${
                message.status === "new"
                  ? "border-blue-200 bg-blue-50/50"
                  : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {message.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {message.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          message.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : message.status === "replied"
                            ? "bg-green-100 text-green-800"
                            : message.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.status === "new"
                          ? "Nouveau"
                          : message.status === "replied"
                          ? "Répondu"
                          : message.status === "pending"
                          ? "En attente"
                          : "Résolu"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          message.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : message.priority === "medium"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.priority === "high"
                          ? "Urgent"
                          : message.priority === "medium"
                          ? "Moyen"
                          : "Faible"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {message.email}
                    </p>
                    <p className="text-gray-900 font-medium mb-2">
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500">{message.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <Archive className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Messages;
