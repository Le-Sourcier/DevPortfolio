import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/Card";
import {
  Globe,
  Smartphone,
  Code2,
  Database,
  Cloud,
  Shield,
  Zap,
  ArrowRight,
  Check,
  MessageSquare,
  Star,
  Users,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Package,
  GitBranch,
  Layers,
  Server,
  Bot,
} from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<"startup" | "business" | "enterprise">("business");

  const services = [
    {
      icon: Globe,
      title: "Développement Web Frontend",
      description: "Applications web modernes, performantes et accessibles.",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "React 18 / Next.js 14 / Vue.js 3",
        "TypeScript & Tailwind CSS",
        "Framer Motion & animations",
        "SEO & Core Web Vitals optimisés",
        "PWA & Responsive Design",
      ],
      deliverables: ["Code source complet", "Documentation technique", "Tests unitaires"],
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      description: "Applications cross-platform iOS et Android.",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Flutter & React Native",
        "Intégration APIs natives",
        "Push notifications",
        "Mode hors-ligne",
        "Déploiement Store",
      ],
      deliverables: ["APK/IPA", "Publication Store", "Analytics intégrés"],
    },
    {
      icon: Server,
      title: "Backend & Architecture",
      description: "APIs robustes et architecture microservices.",
      gradient: "from-emerald-500 to-teal-500",
      features: [
        "Node.js / NestJS / Express",
        "REST / GraphQL / WebSocket",
        "Authentification JWT / OAuth2",
        "Architecture microservices",
        "Documentation Swagger",
      ],
      deliverables: ["API documentée", "Tests d'intégration", "Monitoring"],
    },
    {
      icon: Database,
      title: "Base de Données",
      description: "Modélisation et optimisation de vos données.",
      gradient: "from-orange-500 to-red-500",
      features: [
        "PostgreSQL / MySQL / MongoDB",
        "Redis / Elasticsearch",
        "Prisma / TypeORM / Mongoose",
        "Migration & Backup",
        "Optimisation requêtes",
      ],
      deliverables: ["Schéma optimisé", "Scripts migration", "Backup automatisé"],
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      description: "Infrastructure, déploiement et automatisation.",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "AWS / GCP / Azure",
        "Docker / Kubernetes",
        "GitHub Actions / GitLab CI",
        "Terraform / Ansible",
        "Monitoring & Alerting",
      ],
      deliverables: ["Infrastructure as Code", "Pipeline CI/CD", "Documentation ops"],
    },
    {
      icon: Bot,
      title: "Automatisation & IA",
      description: "Solutions d'automatisation et intégration IA.",
      gradient: "from-pink-500 to-rose-500",
      features: [
        "N8N / Make / Zapier",
        "Intégration GPT / Claude",
        "Chatbots intelligents",
        "Scraping légal",
        "Data enrichment",
      ],
      deliverables: ["Workflows automatisés", "Dashboard analytics", "Formation"],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Découverte",
      description: "Analyse approfondie de vos besoins, objectifs et contraintes techniques.",
      icon: Target,
      color: "blue",
    },
    {
      number: "02",
      title: "Proposition",
      description: "Présentation d'une solution technique détaillée avec planning et budget.",
      icon: Layers,
      color: "purple",
    },
    {
      number: "03",
      title: "Développement",
      description: "Sprints agiles avec démonstrations régulières et feedback continu.",
      icon: Code2,
      color: "emerald",
    },
    {
      number: "04",
      title: "Livraison",
      description: "Déploiement, formation et support pour garantir votre succès.",
      icon: Rocket,
      color: "orange",
    },
  ];

  const stats = [
    { value: "50+", label: "Projets livrés", icon: Package },
    { value: "5+", label: "Années d'expérience", icon: Clock },
    { value: "100%", label: "Clients satisfaits", icon: Star },
    { value: "24h", label: "Temps de réponse", icon: Zap },
  ];

  const pricingPlans = [
    {
      id: "startup",
      name: "Startup",
      description: "Idéal pour les MVP et projets simples",
      features: [
        "Site web / Landing page",
        "Design responsive",
        "Hébergement 1 an inclus",
        "Support email",
        "1 révision majeure",
      ],
      highlight: false,
    },
    {
      id: "business",
      name: "Business",
      description: "Pour les projets ambitieux",
      features: [
        "Application web complète",
        "Backend & API sur mesure",
        "Dashboard admin",
        "Intégration paiement",
        "Support prioritaire",
        "3 mois de maintenance",
      ],
      highlight: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Solutions complexes et sur mesure",
      features: [
        "Architecture microservices",
        "Applications mobiles",
        "Haute disponibilité",
        "Audit sécurité",
        "Formation équipe",
        "Support 24/7",
        "SLA garanti",
      ],
      highlight: false,
    },
  ];

  const testimonials = [
    {
      name: "Marie Dupont",
      role: "CEO, TechStartup",
      content: "Une expertise technique remarquable. Le projet a été livré dans les délais avec une qualité exceptionnelle.",
      avatar: "MD",
    },
    {
      name: "Jean Martin",
      role: "CTO, InnovateCorp",
      content: "Communication fluide et solutions créatives. Je recommande vivement pour tout projet de développement.",
      avatar: "JM",
    },
    {
      name: "Sophie Bernard",
      role: "Product Manager",
      content: "Professionnalisme et réactivité. Notre application mobile a dépassé toutes nos attentes.",
      avatar: "SB",
    },
  ];

  const faqs = [
    {
      question: "Quels sont vos délais de livraison ?",
      answer: "Les délais varient selon la complexité du projet. Un MVP peut être livré en 2-4 semaines, tandis qu'une application complète nécessite généralement 2-3 mois.",
    },
    {
      question: "Proposez-vous un support après livraison ?",
      answer: "Oui, tous mes projets incluent une période de garantie et je propose des contrats de maintenance pour un support continu.",
    },
    {
      question: "Travaillez-vous en remote ?",
      answer: "Absolument ! Je travaille avec des clients du monde entier. Les outils de communication modernes permettent une collaboration efficace à distance.",
    },
    {
      question: "Comment se déroule le paiement ?",
      answer: "Généralement en 3 étapes : 30% à la signature, 40% à mi-parcours, et 30% à la livraison. Des arrangements flexibles sont possibles.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <SEO
        title="Services"
        description="Services de développement web, mobile et architecture logicielle."
        url="/services"
      />

      {/* Hero Section - immersive, extends behind header */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background - extends beyond section to cover header area */}
        <div className="absolute inset-0 -top-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
        <div className="absolute inset-0 -top-20 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Services Professionnels
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transformez vos idées en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  solutions digitales
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                De la conception à la mise en production, je vous accompagne dans la réalisation de vos projets numériques les plus ambitieux.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/contact">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/20">
                    Démarrer un projet <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#services">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur">
                    Explorer les services
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gray-50 dark:fill-gray-900"
            />
          </svg>
        </div>
      </section>

      {/* Services Grid - Interactive */}
      <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
                Expertise
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Domaines d'intervention
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Un spectre complet de compétences pour couvrir tous vos besoins techniques.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveService(idx)}
                onMouseLeave={() => setActiveService(null)}
                className="group relative"
              >
                <div className={`relative h-full rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-8 overflow-hidden transition-all duration-500 ease-out ${
                  activeService === idx
                    ? 'shadow-2xl shadow-blue-500/15 dark:shadow-blue-500/10 -translate-y-2 border-blue-200 dark:border-blue-800'
                    : 'shadow-sm hover:shadow-lg'
                }`}>
                  {/* Soft gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-opacity duration-700 ease-out ${
                    activeService === idx ? 'opacity-[0.03]' : 'opacity-0'
                  }`} />

                  {/* Glow effect */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.gradient} rounded-full blur-3xl transition-all duration-700 ease-out ${
                    activeService === idx ? 'opacity-20 scale-100' : 'opacity-0 scale-50'
                  }`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg transition-all duration-500 ease-out ${
                    activeService === idx ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
                  }`}>
                    <service.icon size={28} className="text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                    activeService === idx ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 relative z-10">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 relative z-10">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        initial={false}
                        animate={{
                          x: activeService === idx ? 4 : 0,
                          transition: { delay: i * 0.03, duration: 0.3, ease: "easeOut" }
                        }}
                      >
                        <CheckCircle2 className={`w-4 h-4 mr-2.5 flex-shrink-0 transition-colors duration-300 ${
                          activeService === idx ? 'text-blue-500' : 'text-emerald-500'
                        }`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Deliverables - Smooth reveal */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeService === idx ? "auto" : 0,
                      opacity: activeService === idx ? 1 : 0,
                      marginTop: activeService === idx ? 0 : -8
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden relative z-10"
                  >
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Livrables inclus
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.deliverables.map((item, i) => (
                          <motion.span
                            key={i}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r ${service.gradient} bg-opacity-10 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom arrow indicator */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: activeService === idx ? 1 : 0,
                      x: activeService === idx ? 0 : -10
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-6 right-6"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Timeline */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-4">
                Méthodologie
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Comment je travaille
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Une approche structurée et transparente pour garantir la réussite de votre projet.
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900" />
                  )}

                  <div className="text-center">
                    {/* Step number */}
                    <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 shadow-lg mb-6`}>
                      <step.icon size={32} className="text-white" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-4">
                Tarification
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Des offres adaptées à vos besoins
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Chaque projet est unique. Contactez-moi pour un devis personnalisé.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 ${plan.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/25 scale-105'
                  : 'bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800'
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-yellow-400 text-yellow-900 text-sm font-bold shadow-lg">
                      Populaire
                    </span>
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.highlight ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.highlight ? 'text-green-300' : 'text-emerald-500'}`} />
                      <span className={plan.highlight ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button
                    className={`w-full h-12 rounded-xl font-semibold ${plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                      }`}
                  >
                    Demander un devis
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">
                Témoignages
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Ce que disent mes clients
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Questions fréquentes
              </h2>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-6 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-transform ${openFaq === idx ? 'rotate-45' : ''}`}>
                      <span className="text-xl text-gray-600 dark:text-gray-400">+</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern-white.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Discutons de vos besoins et créons ensemble une solution qui dépasse vos attentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                  Démarrer maintenant <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <a href="mailto:yaodavidlogan02@gmail.com">
                <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-white/30 text-white hover:bg-white/10">
                  yaodavidlogan02@gmail.com
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
