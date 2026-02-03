import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowRight,
  Sparkles,
  User,
  Building2,
  FileText,
  Zap,
  Shield,
  HeartHandshake,
  Coffee,
  Video,
  CalendarDays,
} from "lucide-react";

import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { useCreateMessage } from "../api/messages";

const Contact = () => {
  const { t } = useTranslation();
  const createMessage = useCreateMessage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await createMessage.mutateAsync({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        projectType: formData.projectType || undefined,
        budget: formData.budget || undefined,
        timeline: formData.timeline || undefined,
        message: formData.message,
      });

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
        setActiveStep(1);
      }, 5000);
    } catch (error) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "yaodavidlogan02@gmail.com",
      description: "Réponse sous 24h",
      action: "mailto:yaodavidlogan02@gmail.com",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Téléphone",
      value: "+228 91 68 09 67",
      description: "Lun-Ven 9h-18h",
      action: "tel:+22891680967",
      color: "emerald",
    },
    {
      icon: MapPin,
      title: "Localisation",
      value: "Lomé, Togo",
      description: "Remote & International",
      action: "#",
      color: "purple",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Le-Sourcier", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yao-logan", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const projectTypes = [
    { value: "web", label: "Application Web" },
    { value: "mobile", label: "Application Mobile" },
    { value: "backend", label: "Backend / API" },
    { value: "fullstack", label: "Solution Full-Stack" },
    { value: "consulting", label: "Consulting / Audit" },
    { value: "other", label: "Autre" },
  ];

  const budgetRanges = [
    { value: "small", label: "< 2 000 €" },
    { value: "medium", label: "2 000 € - 5 000 €" },
    { value: "large", label: "5 000 € - 15 000 €" },
    { value: "enterprise", label: "> 15 000 €" },
    { value: "discuss", label: "À discuter" },
  ];

  const timelines = [
    { value: "urgent", label: "Urgent (< 2 semaines)" },
    { value: "short", label: "Court terme (1-2 mois)" },
    { value: "medium", label: "Moyen terme (2-4 mois)" },
    { value: "flexible", label: "Flexible" },
  ];

  const features = [
    { icon: Zap, title: "Réponse rapide", description: "Sous 24h ouvrées" },
    { icon: Shield, title: "Confidentialité", description: "Vos données sont protégées" },
    { icon: HeartHandshake, title: "Sans engagement", description: "Devis gratuit" },
  ];

  const nextStep = () => {
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const canProceedStep1 = formData.name && formData.email;
  const canProceedStep2 = formData.projectType;

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact"
        description="Contactez-moi pour discuter de votre projet web ou mobile."
        url="/contact"
      />

      {/* Hero Section - immersive, extends behind header */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background - extends beyond section to cover header area */}
        <div className="absolute inset-0 -top-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
        <div className="absolute inset-0 -top-20 bg-[url('/grid-pattern-white.svg')] opacity-10" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Disponible pour de nouveaux projets
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transformons votre{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  vision
                </span>{" "}
                en réalité
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Une idée ? Un projet ? Discutons ensemble et créons quelque chose d'extraordinaire.
              </p>

              {/* Quick contact methods */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:yaodavidlogan02@gmail.com"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Envoyer un email
                </a>
                <a
                  href="tel:+22891680967"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur text-white font-semibold hover:bg-white/30 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +228 91 68 09 67
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-gray-950"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left Column - Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Methods */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Restons en contact
                </h2>
                <div className="space-y-4">
                  {contactMethods.map((method, idx) => (
                    <motion.a
                      key={idx}
                      href={method.action}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-lg"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${method.color}-100 dark:bg-${method.color}-900/30 text-${method.color}-600 dark:text-${method.color}-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <method.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {method.title}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {method.value}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Retrouvez-moi sur
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon size={22} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      </span>
                      <span className="font-semibold">Disponible maintenant</span>
                    </div>
                    <p className="text-white/80 mb-4">
                      Je suis actuellement disponible pour de nouveaux projets freelance et des collaborations long terme.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Réponse 24h
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Remote
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                    <feature.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border border-gray-100 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-900 overflow-hidden">
                  <CardContent className="p-8 lg:p-10">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="text-center py-16"
                        >
                          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Message envoyé !
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                            Merci pour votre message. Je vous réponds sous 24h.
                          </p>
                          <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Coffee className="w-4 h-4" />
                            En attendant, prenez un café !
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Progress Steps */}
                          <div className="flex items-center justify-between mb-8">
                            {[1, 2, 3].map((step) => (
                              <div key={step} className="flex items-center">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                                    activeStep >= step
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                                  }`}
                                >
                                  {step}
                                </div>
                                {step < 3 && (
                                  <div
                                    className={`w-16 sm:w-24 lg:w-32 h-1 mx-2 rounded transition-colors ${
                                      activeStep > step
                                        ? "bg-blue-600"
                                        : "bg-gray-100 dark:bg-gray-800"
                                    }`}
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                              {/* Step 1: Personal Info */}
                              {activeStep === 1 && (
                                <motion.div
                                  key="step1"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="space-y-6"
                                >
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      Vos coordonnées
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      Comment puis-je vous contacter ?
                                    </p>
                                  </div>

                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Nom complet *
                                      </label>
                                      <Input
                                        name="name"
                                        placeholder="Jean Dupont"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> Email *
                                      </label>
                                      <Input
                                        name="email"
                                        type="email"
                                        placeholder="jean@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                      <Building2 className="w-4 h-4" /> Entreprise (optionnel)
                                    </label>
                                    <Input
                                      name="company"
                                      placeholder="Nom de votre entreprise"
                                      value={formData.company}
                                      onChange={handleInputChange}
                                      className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    />
                                  </div>

                                  <div className="flex justify-end">
                                    <Button
                                      type="button"
                                      onClick={nextStep}
                                      disabled={!canProceedStep1}
                                      className="h-12 px-8 rounded-xl"
                                    >
                                      Continuer <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                  </div>
                                </motion.div>
                              )}

                              {/* Step 2: Project Details */}
                              {activeStep === 2 && (
                                <motion.div
                                  key="step2"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="space-y-6"
                                >
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      Votre projet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      Parlez-moi de ce que vous souhaitez réaliser.
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Type de projet *
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                      {projectTypes.map((type) => (
                                        <button
                                          key={type.value}
                                          type="button"
                                          onClick={() => setFormData({ ...formData, projectType: type.value })}
                                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                                            formData.projectType === type.value
                                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300"
                                          }`}
                                        >
                                          <span className="font-medium text-sm">{type.label}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Budget estimé
                                      </label>
                                      <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                      >
                                        <option value="">Sélectionner</option>
                                        {budgetRanges.map((range) => (
                                          <option key={range.value} value={range.value}>
                                            {range.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Délai souhaité
                                      </label>
                                      <select
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                      >
                                        <option value="">Sélectionner</option>
                                        {timelines.map((tl) => (
                                          <option key={tl.value} value={tl.value}>
                                            {tl.label}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="flex justify-between">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={prevStep}
                                      className="h-12 px-6 rounded-xl"
                                    >
                                      Retour
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={nextStep}
                                      disabled={!canProceedStep2}
                                      className="h-12 px-8 rounded-xl"
                                    >
                                      Continuer <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                  </div>
                                </motion.div>
                              )}

                              {/* Step 3: Message */}
                              {activeStep === 3 && (
                                <motion.div
                                  key="step3"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="space-y-6"
                                >
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                      Détails du projet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      Décrivez votre projet en quelques lignes.
                                    </p>
                                  </div>

                                  <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                      <FileText className="w-4 h-4" /> Votre message *
                                    </label>
                                    <textarea
                                      name="message"
                                      rows={6}
                                      placeholder="Décrivez votre projet, vos objectifs, vos contraintes..."
                                      value={formData.message}
                                      onChange={handleInputChange}
                                      required
                                      className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    />
                                  </div>

                                  {/* Summary */}
                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                                      Récapitulatif
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div>
                                        <span className="text-gray-500 dark:text-gray-400">Contact:</span>
                                        <span className="ml-2 text-gray-900 dark:text-white">{formData.name}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500 dark:text-gray-400">Projet:</span>
                                        <span className="ml-2 text-gray-900 dark:text-white">
                                          {projectTypes.find((t) => t.value === formData.projectType)?.label}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-between">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={prevStep}
                                      className="h-12 px-6 rounded-xl"
                                    >
                                      Retour
                                    </Button>
                                    <Button
                                      type="submit"
                                      disabled={isSubmitting || !formData.message}
                                      className="h-12 px-8 rounded-xl min-w-[180px]"
                                    >
                                      {isSubmitting ? (
                                        <span className="flex items-center">
                                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                          Envoi...
                                        </span>
                                      ) : (
                                        <>
                                          Envoyer <Send className="ml-2 w-4 h-4" />
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map / Location Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Travaillons ensemble, où que vous soyez
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Basé à Lomé, Togo - Je collabore avec des clients du monde entier en remote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <Globe className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                Remote Friendly
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <Video className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Visio disponible
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <CalendarDays className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                Flexible
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
