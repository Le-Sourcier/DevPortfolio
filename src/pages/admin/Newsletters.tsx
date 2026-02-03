import { Mail, Search, Calendar, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNewsletterSubscribers } from "../../api/newsletter";
import { PageHeader, LoadingScreen } from "../../components/admin/ui";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

function NewslettersPage() {
  const { data: subscribers, isLoading } = useNewsletterSubscribers();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return <LoadingScreen />;
  }

  const filteredSubscribers = (subscribers || []).filter((sub: any) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Newsletter"
        description="Gérez les abonnés à votre newsletter"
        icon={Mail}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>{filteredSubscribers.length}</strong> abonnés
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4">Date d'inscription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Aucun abonné trouvé
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {sub.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sub.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          <CheckCircle className="w-3 h-3" />
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          Inactif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(sub.createdAt), "d MMMM yyyy", { locale: fr })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewslettersPage;
