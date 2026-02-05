import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  Trash2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Link as LinkIcon,
  AlertCircle,
  Bell,
  Linkedin,
  Github,
  Globe,
  Upload,
  Users,
  Save,
  Send,
  Sparkles,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  useApplication,
  useSpontaneousApplication,
  useUpdateApplicationStatus,
  useUpdateSpontaneousApplicationStatus,
  useDeleteApplication,
  useDeleteSpontaneousApplication,
} from "../../api/applications";

const ApplicationDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';
  const { id, type } = useParams<{ id: string; type: string }>();
  const navigate = useNavigate();

  const isSpontaneous = type === 'spontaneous';

  // Fetch data
  const { data: regularData, isLoading: loadingRegular } = useApplication(id || "", { enabled: !isSpontaneous });
  const { data: spontaneousData, isLoading: loadingSpontaneous } = useSpontaneousApplication(id || "", { enabled: isSpontaneous });

  const application = isSpontaneous ? spontaneousData?.data : regularData?.data;
  const isLoading = isSpontaneous ? loadingSpontaneous : loadingRegular;

  const updateRegular = useUpdateApplicationStatus();
  const updateSpontaneous = useUpdateSpontaneousApplicationStatus();
  const deleteRegular = useDeleteApplication();
  const deleteSpontaneous = useDeleteSpontaneousApplication();

  // State
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    duration: "1 heure",
    type: "Visio",
    location: "",
    meetingLink: "",
    notes: "",
  });

  const statusOptions = [
    { value: "pending", label: "En attente", color: "gray", icon: Clock },
    { value: "reviewing", label: "En cours de révision", color: "blue", icon: Eye },
    { value: "shortlisted", label: "Présélectionné", color: "purple", icon: Users },
    { value: "interview", label: "Entretien", color: "orange", icon: Calendar },
    { value: "accepted", label: "Accepté", color: "green", icon: CheckCircle2 },
    { value: "rejected", label: "Rejeté", color: "red", icon: XCircle },
  ];

  const currentStatus = statusOptions.find(s => s.value === application?.status);
  const StatusIcon = currentStatus?.icon || Clock;

  const handleStatusChange = async (newStatus: string) => {
    if (!application) return;

    try {
      const payload: any = { id: application.id, status: newStatus };

      // Add interview details if changing to interview status
      if (newStatus === 'interview' && interviewData.date) {
        payload.interviewDetails = interviewData;
      }

      // Add admin notes if provided
      if (adminNotes.trim()) {
        payload.adminNotes = adminNotes;
      }

      if (isSpontaneous) {
        await updateSpontaneous.mutateAsync(payload);
      } else {
        await updateRegular.mutateAsync(payload);
      }

      setShowInterviewForm(false);
      alert('✅ Statut mis à jour et email envoyé au candidat!');
    } catch (error) {
      console.error("Failed to update status:", error);
      alert('❌ Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!application) return;
    if (!confirm(`Supprimer définitivement la candidature de ${application.firstName} ${application.lastName} ?`)) return;

    try {
      if (isSpontaneous) {
        await deleteSpontaneous.mutateAsync(application.id);
      } else {
        await deleteRegular.mutateAsync(application.id);
      }
      navigate('/admin/applications');
    } catch (error) {
      console.error("Failed to delete:", error);
      alert('❌ Erreur lors de la suppression');
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center py-16">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="p-8">
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Candidature introuvable
          </h2>
          <Link to="/admin/applications">
            <Button variant="outline" className="rounded-xl mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/applications')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Retour à la liste</span>
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                {application.firstName} {application.lastName}
              </h1>
              <span className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 bg-${currentStatus?.color}-100 dark:bg-${currentStatus?.color}-900/30 text-${currentStatus?.color}-700 dark:text-${currentStatus?.color}-300`}>
                <StatusIcon className="w-4 h-4" />
                {currentStatus?.label}
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isSpontaneous
                ? application.desiredPosition
                : (application.job?.title?.[lang] || application.job?.title?.fr)
              }
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <Card className="p-6 border-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Informations de Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Email</p>
                <a
                  href={`mailto:${application.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-lg flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {application.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Téléphone</p>
                <a
                  href={`tel:${application.phone}`}
                  className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {application.phone}
                </a>
              </div>
              {application.currentLocation && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Localisation</p>
                  <p className="text-gray-900 dark:text-white font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {application.currentLocation}
                  </p>
                </div>
              )}
              {application.expectedSalary && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Salaire attendu</p>
                  <p className="text-gray-900 dark:text-white font-bold flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    {application.expectedSalary}€
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Professional Details */}
          {(application.yearsOfExperience || application.currentPosition || application.availabilityDate) && (
            <Card className="p-6 border-2">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                Détails Professionnels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {application.yearsOfExperience && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Expérience</p>
                    <p className="text-gray-900 dark:text-white font-bold text-lg">
                      {application.yearsOfExperience} ans
                    </p>
                  </div>
                )}
                {application.currentPosition && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Poste actuel</p>
                    <p className="text-gray-900 dark:text-white font-bold text-lg">
                      {application.currentPosition}
                    </p>
                  </div>
                )}
                {application.availabilityDate && (
                  <div className="md:col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-2">Disponibilité</p>
                    <p className="text-gray-900 dark:text-white font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {new Date(application.availabilityDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Professional Links */}
          {(application.linkedinUrl || application.portfolioUrl || application.githubUrl) && (
            <Card className="p-6 border-2">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                Liens Professionnels
              </h2>
              <div className="flex flex-wrap gap-3">
                {application.linkedinUrl && (
                  <a
                    href={application.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {application.portfolioUrl && (
                  <a
                    href={application.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
                  >
                    <Globe className="w-5 h-5" />
                    Portfolio
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {application.githubUrl && (
                  <a
                    href={application.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold transition-all"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </Card>
          )}

          {/* Preferences (for spontaneous) */}
          {isSpontaneous && (application.desiredCategories?.length > 0 || application.desiredContractTypes?.length > 0 || application.desiredRemoteTypes?.length > 0) && (
            <Card className="p-6 border-2">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
                Préférences de poste
              </h2>
              <div className="space-y-4">
                {application.desiredCategories?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-3">Catégories</p>
                    <div className="flex flex-wrap gap-2">
                      {application.desiredCategories.map((cat: string) => (
                        <span key={cat} className="px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {application.desiredContractTypes?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-3">Types de contrat</p>
                    <div className="flex flex-wrap gap-2">
                      {application.desiredContractTypes.map((type: string) => (
                        <span key={type} className="px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {application.desiredRemoteTypes?.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-3">Mode de travail</p>
                    <div className="flex flex-wrap gap-2">
                      {application.desiredRemoteTypes.map((type: string) => (
                        <span key={type} className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Message */}
          {application.message && (
            <Card className="p-6 border-2">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                Message de motivation
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {application.message}
                </p>
              </div>
            </Card>
          )}

          {/* Documents */}
          <Card className="p-6 border-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CV */}
              {application.cvUrl && (
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white text-lg">CV</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`http://localhost:5000${application.cvUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </a>
                    <a
                      href={`http://localhost:5000${application.cvUrl}`}
                      download
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {application.coverLetterUrl && (
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FileText className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white text-lg">Lettre</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={`http://localhost:5000${application.coverLetterUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </a>
                    <a
                      href={`http://localhost:5000${application.coverLetterUrl}`}
                      download
                      className="flex-1 px-4 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Admin Notes */}
          <Card className="p-6 border-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
              Notes administrateur
            </h2>
            <textarea
              value={adminNotes || application.adminNotes || ""}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Ajoutez des notes internes sur cette candidature..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none"
              rows={6}
            />
          </Card>
        </div>

        {/* Sidebar - Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Timeline */}
          <Card className="p-6 border-2">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">
              Process de recrutement
            </h3>
            <div className="space-y-4">
              {statusOptions.map((status, idx) => {
                const isCurrentStatus = status.value === application.status;
                const isPassed = statusOptions.findIndex(s => s.value === application.status) > idx;
                const StatusIconItem = status.icon;

                return (
                  <div
                    key={status.value}
                    className={`flex items-center gap-4 ${isCurrentStatus ? 'opacity-100' : isPassed ? 'opacity-60' : 'opacity-30'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isCurrentStatus
                        ? `bg-${status.color}-600 text-white shadow-lg`
                        : isPassed
                        ? `bg-${status.color}-100 dark:bg-${status.color}-900/30 text-${status.color}-600 dark:text-${status.color}-400`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}>
                      <StatusIconItem className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${isCurrentStatus ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                        {status.label}
                      </p>
                      {isCurrentStatus && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-1">
                          <Sparkles className="w-3 h-3" />
                          Statut actuel
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 border-2">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">
              Actions rapides
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('reviewing')}
                disabled={application.status === 'reviewing'}
                className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Marquer en révision
              </button>

              <button
                onClick={() => handleStatusChange('shortlisted')}
                disabled={application.status === 'shortlisted'}
                className="w-full px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                Présélectionner
              </button>

              <button
                onClick={() => setShowInterviewForm(!showInterviewForm)}
                className="w-full px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {showInterviewForm ? 'Masquer formulaire' : 'Programmer entretien'}
              </button>

              {showInterviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Date *</label>
                      <input
                        type="date"
                        value={interviewData.date}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Heure *</label>
                      <input
                        type="time"
                        value={interviewData.time}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Durée</label>
                      <select
                        value={interviewData.duration}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      >
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>1 heure</option>
                        <option>1h30</option>
                        <option>2 heures</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Type</label>
                      <select
                        value={interviewData.type}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      >
                        <option>Visio</option>
                        <option>Présentiel</option>
                        <option>Téléphonique</option>
                      </select>
                    </div>
                  </div>
                  {interviewData.type === 'Visio' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Lien de réunion</label>
                      <input
                        type="url"
                        value={interviewData.meetingLink}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, meetingLink: e.target.value }))}
                        placeholder="https://meet.google.com/xxx"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  )}
                  {interviewData.type === 'Présentiel' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
                      <input
                        type="text"
                        value={interviewData.location}
                        onChange={(e) => setInterviewData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="123 Rue Example, 75001 Paris"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                    <textarea
                      value={interviewData.notes}
                      onChange={(e) => setInterviewData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Instructions, préparation..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm resize-none"
                      rows={2}
                    />
                  </div>
                  <button
                    onClick={() => handleStatusChange('interview')}
                    disabled={!interviewData.date || !interviewData.time}
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Confirmer et envoyer l'invitation
                  </button>
                </motion.div>
              )}

              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <button
                  onClick={() => {
                    if (confirm(`Accepter la candidature de ${application.firstName} ${application.lastName} ?`)) {
                      handleStatusChange('accepted');
                    }
                  }}
                  disabled={application.status === 'accepted'}
                  className="w-full px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accepter la candidature
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Rejeter la candidature de ${application.firstName} ${application.lastName} ? Un email sera envoyé.`)) {
                      handleStatusChange('rejected');
                    }
                  }}
                  disabled={application.status === 'rejected'}
                  className="w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Rejeter la candidature
                </button>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-6 border-2 bg-blue-50 dark:bg-blue-900/20">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>Reçue le {new Date(application.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              {application.subscribeToAlerts && (
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Bell className="w-4 h-4" />
                  <span className="font-semibold">Inscrit aux alertes emploi</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
