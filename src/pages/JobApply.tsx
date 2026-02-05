import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Link as LinkIcon,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Github,
  Linkedin,
  Globe,
  Bell,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useJob } from "../api/jobs";
import { useCreateApplication } from "../api/applications";

const JobApply = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch job details
  const { data: jobResponse, isLoading: loadingJob } = useJob(slug || "");
  const job = jobResponse?.data;

  const createApplication = useCreateApplication();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentLocation: "",
    linkedinUrl: "",
    portfolioUrl: "",
    githubUrl: "",
    yearsOfExperience: "",
    currentPosition: "",
    expectedSalary: "",
    availabilityDate: "",
    message: "",
    subscribeToAlerts: true,
  });

  const [files, setFiles] = useState<{
    cv: File | null;
    coverLetter: File | null;
  }>({
    cv: null,
    coverLetter: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [type]: "Fichier trop volumineux (max 5MB)" }));
        return;
      }
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [type]: "Format non accepté (PDF, DOC, DOCX uniquement)" }));
        return;
      }
      setFiles(prev => ({ ...prev, [type]: file }));
      setErrors(prev => ({ ...prev, [type]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!files.cv) newErrors.cv = "CV requis";
    if (!formData.message.trim()) newErrors.message = "Message de motivation requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !job) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', job.id);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });

      if (files.cv) formDataToSend.append('cv', files.cv);
      if (files.coverLetter) formDataToSend.append('coverLetter', files.coverLetter);

      await createApplication.mutateAsync(formDataToSend);

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error("Failed to submit application:", error);

      // Check if already applied
      if (error?.response?.data?.message === "ALREADY_APPLIED") {
        setErrors({ submit: "Vous avez déjà postulé à cette offre. Une seule candidature par offre est autorisée." });
      } else {
        setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
      }
    }
  };

  if (loadingJob) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("careers.job.notFound")}
          </h2>
          <Link to="/careers">
            <Button variant="outline" className="rounded-xl mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("careers.job.backToList")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20">
        <SEO title={`${t("careers.apply.success")} - ${job.title[lang]}`} />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                {t("careers.apply.successTitle") || "Candidature envoyée !"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                {t("careers.apply.successMessage") || "Nous avons bien reçu votre candidature. Notre équipe l'examinera et vous contactera sous peu."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/careers">
                  <Button size="lg" className="rounded-xl">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t("careers.job.backToList")}
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="rounded-xl">
                    {t("common.home")}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <SEO
        title={`${t("careers.apply.title")} - ${job.title[lang]}`}
        description={job.description[lang] || job.description.fr}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(`/careers/${slug}`)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">{t("careers.apply.backToJob") || "Retour à l'offre"}</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("careers.apply.badge") || "Postuler"}
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              {job.title[lang] || job.title.fr}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t("careers.apply.subtitle") || "Complétez le formulaire ci-dessous pour postuler"}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 border-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    {t("careers.apply.personalInfo") || "Informations personnelles"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.firstName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all`}
                        placeholder="Jean"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.lastName")} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all`}
                        placeholder="Dupont"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.email")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all`}
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.phone")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all`}
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.location")}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="currentLocation"
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                          placeholder="Paris, France"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {t("careers.apply.professionalLinks") || "Liens professionnels"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        placeholder="linkedin.com/in/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-600" />
                        Portfolio
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        placeholder="monportfolio.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    {t("careers.apply.professionalDetails") || "Détails professionnels"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.experience") || "Années d'expérience"}
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        placeholder="5"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.currentPosition") || "Poste actuel"}
                      </label>
                      <input
                        type="text"
                        name="currentPosition"
                        value={formData.currentPosition}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        placeholder="Développeur Full Stack"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.expectedSalary") || "Salaire attendu"}
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="expectedSalary"
                          value={formData.expectedSalary}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                          placeholder="45000-55000€"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.availability") || "Disponibilité"}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          name="availabilityDate"
                          value={formData.availabilityDate}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    {t("careers.apply.documents") || "Documents"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.cv")} <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative border-2 ${errors.cv ? 'border-red-500' : 'border-dashed border-gray-300 dark:border-gray-700'} rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer bg-gray-50 dark:bg-gray-900`}>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'cv')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {files.cv ? files.cv.name : "Cliquez pour uploader votre CV"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                        </div>
                      </div>
                      {errors.cv && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.cv}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.coverLetter") || "Lettre de motivation"}
                        <span className="text-gray-400 text-xs ml-2">({t("common.optional")})</span>
                      </label>
                      <div className={`relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer bg-gray-50 dark:bg-gray-900`}>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(e, 'coverLetter')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                          <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {files.coverLetter ? files.coverLetter.name : "Cliquez pour uploader"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                    {t("careers.apply.motivationMessage") || "Message de motivation"} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none`}
                    placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Job Alerts Opt-in */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                  <label className="flex items-start gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.subscribeToAlerts}
                      onChange={(e) => setFormData(prev => ({ ...prev, subscribeToAlerts: e.target.checked }))}
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {t("careers.apply.alertsOptIn") || "Recevoir les alertes emploi"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("careers.apply.alertsOptInDesc") || "Soyez notifié instantanément des nouvelles offres correspondant à votre profil"}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Error */}
                {errors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-600 dark:text-red-400 font-semibold">{errors.submit}</p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(`/careers/${slug}`)}
                    className="rounded-xl flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createApplication.isPending}
                    className="rounded-xl flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30"
                  >
                    {createApplication.isPending ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t("careers.apply.submit") || "Envoyer ma candidature"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
