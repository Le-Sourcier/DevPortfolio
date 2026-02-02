//admin/messages
import { motion } from "framer-motion";
import { MessageSquare, Mail, Clock, CheckCircle, Archive, Trash2, Reply } from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

function Messages() {
  const stats = [
    { title: "Non lus", count: 3, icon: Mail, color: "bg-red-500" },
    { title: "En cours", count: 7, icon: Clock, color: "bg-yellow-500" },
    { title: "Résolus", count: 24, icon: CheckCircle, color: "bg-green-500" },
    { title: "Archivés", count: 156, icon: Archive, color: "bg-gray-500" },
  ];

  const messages = [
    {
      id: 1,
      name: "Marie Dubois",
      email: "marie@example.com",
      subject: "Demande de devis pour site e-commerce",
      time: "2h",
      status: "new",
      priority: "high",
    },
    {
      id: 2,
      name: "Thomas Martin",
      email: "thomas@startup.com",
      subject: "Question sur vos services de développement mobile",
      time: "4h",
      status: "replied",
      priority: "medium",
    },
    // Add more mock data...
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
           <p className="text-gray-500">Centre de messagerie.</p>
        </div>
        <Button>
           <Mail className="w-4 h-4 mr-2" /> Nouveau message
        </Button>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${stat.color}`}>
                   <stat.icon size={20} />
                 </div>
                 <div>
                   <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                   <p className="text-sm text-gray-500">{stat.title}</p>
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <motion.div
            layout
            key={message.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <Card className={`hover:shadow-md transition-shadow cursor-pointer ${message.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}>
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                   <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                        {message.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <span className="text-xs text-gray-400">• {message.time}</span>
                           {message.status === 'new' && (
                             <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Nouveau</span>
                           )}
                           <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                             message.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                           }`}>
                             {message.priority === "high" ? "Urgent" : "Normal"}
                           </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{message.email}</p>
                        <p className="text-gray-800 font-medium">{message.subject}</p>
                      </div>
                   </div>

                   <div className="flex gap-2 self-end md:self-start">
                     <Button size="icon" variant="ghost">
                       <Reply className="w-4 h-4 text-gray-500" />
                     </Button>
                     <Button size="icon" variant="ghost">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                     </Button>
                     <Button size="icon" variant="ghost">
                        <Trash2 className="w-4 h-4 text-red-500" />
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
