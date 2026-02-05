import { useState } from "react";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  Trash2,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Link as LinkIcon,
  AlertCircle,
  X,
  Upload,
  Bell,
  Linkedin,
  Github,
  Globe
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  useApplications,
  useSpontaneousApplications,
  useUpdateApplicationStatus,
  useUpdateSpontaneousApplicationStatus,
  useDeleteApplication,
  useDeleteSpontaneousApplication,
} from "../../api/applications";
import { useJobs } from "../../api/jobs";

const ApplicationsManagement = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  const [viewType, setViewType] = useState<'regular' | 'spontaneous'>('regular');
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data
  const { data: regularAppsData, isLoading: loadingRegular } = useApplications({
    jobId: selectedJob || undefined,
    status: selectedStatus || undefined,
  });

  const { data: spontaneousAppsData, isLoading: loadingSpontaneous } = useSpontaneousApplications({
    status: selectedStatus || undefined,
  });

  const { data: jobsData } = useJobs();
  const jobs = jobsData?.data || [];

  const updateRegularStatus = useUpdateApplicationStatus();
  const updateSpontaneousStatus = useUpdateSpontaneousApplicationStatus();
  const deleteRegular = useDeleteApplication();
  const deleteSpontaneous = useDeleteSpontaneousApplication();

  const regularApplications = regularAppsData?.data || [];
  const spontaneousApplications = spontaneousAppsData?.data || [];

  const applications = viewType === 'regular' ? regularApplications : spontaneousApplications;
  const isLoading = viewType === 'regular' ? loadingRegular : loadingSpontaneous;

  const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "pending", label: "En attente", color: "gray" },
    { value: "reviewing", label: "En cours de révision", color: "blue" },
    { value: "shortlisted", label: "Présélectionné", color: "purple" },
    { value: "interview", label: "Entretien", color: "orange" },
    { value: "accepted", label: "Accepté", color: "green" },
    { value: "rejected", label: "Rejeté", color: "red" },
  ];

  const getStatusColor = (status: string) => {
    const option = statusOptions.find(s => s.value === status);
    return option?.color || "gray";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "reviewing": return <Eye className="w-4 h-4" />;
      case "shortlisted": return <Users className="w-4 h-4" />;
      case "interview": return <Calendar className="w-4 h-4" />;
      case "accepted": return <CheckCircle2 className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = !selectedJob || app.jobId === selectedJob;
    const matchesStatus = !selectedStatus || app.status === selectedStatus;

    return matchesSearch && matchesJob && matchesStatus;
  });

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      if (viewType === 'regular') {
        await updateRegularStatus.mutateAsync({ id: applicationId, status: newStatus });
      } else {
        await updateSpontaneousStatus.mutateAsync({ id: applicationId, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Gestion des Candidatures
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gérez toutes les candidatures reçues pour vos offres d'emploi
            </p>
          </div>

          {/* View Type Toggle */}
          <div className="flex gap-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
            <button
              onClick={() => setViewType('regular')}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                viewType === 'regular'
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Candidatures ({regularApplications.length})
            </button>
            <button
              onClick={() => setViewType('spontaneous')}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                viewType === 'spontaneous'
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Spontanées ({spontaneousApplications.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {applications.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Total Candidatures
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {applications.filter(a => a.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            En Attente
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {applications.filter(a => a.status === "interview").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Entretiens
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {applications.filter(a => a.status === "accepted").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Acceptés
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Filtres</h3>
        </div>
        <div className={`grid grid-cols-1 gap-4 ${viewType === 'regular' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
          />
          {viewType === 'regular' && (
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
            >
              <option value="">Toutes les offres</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title[lang] || job.title.fr}
                </option>
              ))}
            </select>
          )}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement des candidatures...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Aucune candidature trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Aucune candidature ne correspond à vos critères de recherche
            </p>
          </div>
        ) : (
          applications.map((application: any) => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {application.firstName} {application.lastName}
                  </h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-${getStatusColor(application.status)}-100 dark:bg-${getStatusColor(application.status)}-900/30 text-${getStatusColor(application.status)}-700 dark:text-${getStatusColor(application.status)}-300`}>
                    {getStatusIcon(application.status)}
                    {statusOptions.find(s => s.value === application.status)?.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <strong>Poste:</strong> {
                    viewType === 'regular'
                      ? (application.job?.title?.[lang] || application.job?.title?.fr || 'N/A')
                      : (application.desiredPosition || 'N/A')
                  }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${application.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {application.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    {application.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {application.currentLocation}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Link to={`/admin/applications/${viewType}/${application.id}`}>
                  <button
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Voir Détails
                  </button>
                </Link>
                {application.cvUrl && (
                  <a
                    href={`http://localhost:5000${application.cvUrl}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    CV
                  </a>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-2">
                Changer statut:
              </span>
              {statusOptions.filter(s => s.value && s.value !== application.status).slice(0, 4).map(status => (
                <button
                  key={status.value}
                  onClick={() => handleStatusChange(application.id, status.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-${status.color}-100 dark:bg-${status.color}-900/30 text-${status.color}-700 dark:text-${status.color}-300 hover:bg-${status.color}-200 dark:hover:bg-${status.color}-900/50`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))
        )}
      </div>

    </div>
  );
};

export default ApplicationsManagement;
