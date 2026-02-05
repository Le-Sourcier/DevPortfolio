import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Target,
  Code2,
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useCreateSpontaneousApplication } from "../api/applications";
import { useJobMetadata } from "../api/jobs";

const SpontaneousApply = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';
  const navigate = useNavigate();

  // Fetch metadata for categories
  const { data: metadataResponse } = useJobMetadata();
  const metadata = metadataResponse?.data;
  const categories = metadata?.categories || [];
  const contractTypes = metadata?.contractTypes || [];
  const remoteTypes = metadata?.remoteTypes || [];

  const createSpontaneousApplication = useCreateSpontaneousApplication();

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
    desiredPosition: "",
    desiredCategories: [] as string[],
    desiredContractTypes: [] as string[],
    desiredRemoteTypes: [] as string[],
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

  const toggleArraySelection = (field: 'desiredCategories' | 'desiredContractTypes' | 'desiredRemoteTypes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [type]: "Fichier trop volumineux (max 5MB)" }));
        return;
      }
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
    if (!formData.desiredPosition.trim()) newErrors.desiredPosition = "Poste souhaité requis";
    if (!files.cv) newErrors.cv = "CV requis";
    if (!formData.message.trim()) newErrors.message = "Message de motivation requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      if (files.cv) formDataToSend.append('cv', files.cv);
      if (files.coverLetter) formDataToSend.append('coverLetter', files.coverLetter);

      await createSpontaneousApplication.mutateAsync(formDataToSend);

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Failed to submit application:", error);
      setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20">
        <SEO title={t("careers.spontaneous.successTitle") || "Candidature spontanée envoyée"} />
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
                {t("careers.spontaneous.successTitle") || "Candidature envoyée !"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {t("careers.spontaneous.successMessage") || "Nous avons bien reçu votre candidature spontanée. Nous vous contacterons dès qu'une opportunité correspondant à votre profil sera disponible."}
              </p>
              {formData.subscribeToAlerts && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8 inline-block">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Bell className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      {t("careers.spontaneous.alertsEnabled") || "Alertes emploi activées"}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/careers">
                  <Button size="lg" className="rounded-xl">
                    <Briefcase className="w-5 h-5 mr-2" />
                    {t("careers.spontaneous.viewJobs") || "Voir les offres"}
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
        title={t("careers.spontaneous.title")}
        description={t("careers.spontaneous.description")}
        url="/careers/spontaneous"
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
              onClick={() => navigate("/careers")}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">{t("careers.job.backToList")}</span>
            </button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("careers.spontaneous.badge") || "Candidature Spontanée"}
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              {t("careers.spontaneous.title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("careers.spontaneous.description")}
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
                {/* Personal Information - Same as JobApply */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    {t("careers.apply.personalInfo")}
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

                {/* Desired Position & Preferences */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {t("careers.spontaneous.preferences") || "Préférences de poste"}
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.spontaneous.desiredPosition") || "Poste souhaité"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="desiredPosition"
                        value={formData.desiredPosition}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.desiredPosition ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all`}
                        placeholder="Ex: Développeur Full Stack, Designer UI/UX..."
                      />
                      {errors.desiredPosition && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.desiredPosition}
                        </p>
                      )}
                    </div>

                    {/* Categories */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                        {t("careers.alert.categories")}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => toggleArraySelection('desiredCategories', cat.slug)}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                              formData.desiredCategories.includes(cat.slug)
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {cat.name[lang] || cat.name.fr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Contract Types */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                        {t("careers.filters.type")}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {contractTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => toggleArraySelection('desiredContractTypes', type.slug)}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                              formData.desiredContractTypes.includes(type.slug)
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {type.name[lang] || type.name.fr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Remote Types */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
                        {t("careers.filters.remote")}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {remoteTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => toggleArraySelection('desiredRemoteTypes', type.slug)}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                              formData.desiredRemoteTypes.includes(type.slug)
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {type.name[lang] || type.name.fr}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    {t("careers.apply.professionalLinks")}
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
                    {t("careers.apply.professionalDetails")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                        {t("careers.apply.experience")}
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
                        {t("careers.apply.currentPosition")}
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
                        {t("careers.apply.expectedSalary")}
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
                        {t("careers.apply.availability")}
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
                    {t("careers.apply.documents")}
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
                        {t("careers.apply.coverLetter")}
                        <span className="text-gray-400 text-xs ml-2">({t("common.optional")})</span>
                      </label>
                      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer bg-gray-50 dark:bg-gray-900">
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
                    {t("careers.apply.motivationMessage")} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none`}
                    placeholder="Parlez-nous de vous, de votre parcours et de ce que vous recherchez..."
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
                          {t("careers.apply.alertsOptIn")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t("careers.spontaneous.alertsDesc") || "Recevez instantanément un email dès qu'une offre correspondant à vos préférences est publiée"}
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
                    onClick={() => navigate("/careers")}
                    className="rounded-xl flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={createSpontaneousApplication.isPending}
                    className="rounded-xl flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-xl shadow-purple-500/30"
                  >
                    {createSpontaneousApplication.isPending ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("common.loading")}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t("careers.spontaneous.submit") || "Envoyer ma candidature"}
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

export default SpontaneousApply;
