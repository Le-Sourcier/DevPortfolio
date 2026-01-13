import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Github,
  ExternalLink,
  Calendar,
  Clock,
} from "lucide-react";

const Home = () => {
  const { t } = useTranslation();
  const { projects, blogPosts } = useAppContext();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const featuredPosts = blogPosts.filter((p) => p.featured).slice(0, 2);

  const skills = [
    { name: "React/Next.js", level: 95, color: "bg-blue-500" },
    { name: "TypeScript", level: 90, color: "bg-blue-600" },
    { name: "Node.js/Express", level: 88, color: "bg-green-500" },
    { name: "Vue.js/Nuxt", level: 82, color: "bg-emerald-500" },
    { name: "PostgreSQL/MongoDB", level: 85, color: "bg-indigo-500" },
    { name: "Docker/Kubernetes", level: 78, color: "bg-cyan-500" },
    { name: "AWS/Vercel", level: 80, color: "bg-orange-500" },
    { name: "Tailwind CSS", level: 92, color: "bg-teal-500" },
    { name: "GraphQL/REST", level: 87, color: "bg-purple-500" },
    { name: "Python/FastAPI", level: 75, color: "bg-yellow-500" },
  ];

  const services = [
    {
      icon: Globe,
      title: "Développement Web",
      description:
        "Applications web modernes et performantes avec React, Vue.js et les dernières technologies.",
      features: ["SPA/PWA", "Responsive Design", "Performance optimisée"],
    },
    {
      icon: Smartphone,
      title: "Applications Mobiles",
      description:
        "Applications mobiles natives et cross-platform pour iOS et Android.",
      features: ["React Native", "Flutter", "App Store Deploy"],
    },
    {
      icon: Code2,
      title: "Backend & API",
      description:
        "APIs robustes et scalables avec Node.js, Python et bases de données modernes.",
      features: ["REST/GraphQL", "Microservices", "Cloud Integration"],
    },
  ];

  const stats = [
    { number: "25+", label: t('stats.projects') },
    { number: "15+", label: t('stats.clients') },
    { number: "3+", label: t('stats.experience') },
    { number: "98%", label: t('stats.satisfaction') },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Accueil"
        description="Développeur Full-Stack passionné par la création d'expériences web exceptionnelles. Expertise en React, TypeScript, Node.js."
        keywords={['développeur', 'full-stack', 'react', 'typescript', 'portfolio', 'web']}
        url="/"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                {t('hero.available')}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900 dark:text-gray-100">{t('hero.title')}</span>
                <br />
                <span className="text-gradient">{t('hero.titleGradient')}</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/contact" className="btn-primary">
                {t('header.startProject')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/services" className="btn-secondary dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
                {t('header.discoverServices')}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 dark:opacity-10 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 dark:opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Mes Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Des solutions complètes pour tous vos besoins de développement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover-lift group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/10 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              Expertise Technique
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100 leading-tight">
              {t('skills.title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('skills.subtitle')}
            </p>
          </motion.div>

          {/* Carrousel de stacks professionnel */}
          <div className="relative mb-16 skills-container">
            {/* Gradient overlays pour l'effet de fondu */}

            <div className="overflow-hidden  p-8 relative">
              <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-slate-50/80 dark:from-gray-900/80 to-transparent z-20" />
              <motion.div
                className="flex space-x-12 skills-carousel"
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...skills, ...skills, ...skills].map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="flex-shrink-0 w-56 h-56 relative group cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                    }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-300/40 dark:hover:border-blue-500/40">
                      {/* Logo de la technologie */}
                      <div className="relative z-10 mb-4">
                        {skill.name === "React" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59-.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95z" />
                            </svg>
                          </div>
                        )}
                        {skill.name === "TypeScript" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                              TS
                            </span>
                          </div>
                        )}
                        {skill.name === "Node.js" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46.85 0 1.31-.52 1.31-1.36V9.47c0-.16-.14-.3-.31-.3H7.18c-.17 0-.31.14-.31.31v8.17c0 .64-.69 1.16-1.54.8L3.81 17.36c-.14-.08-.23-.23-.23-.39V8.39c0-.16.09-.31.23-.39l7.44-4.3c.14-.08.32-.08.46 0l7.44 4.3c.14.08.23.23.23.39v8.58c0 .16-.09.31-.23.39l-7.44 4.3c-.14.08-.32.08-.46 0l-1.95-1.12c-.12-.07-.27-.07-.39 0-.4.23-.47.26-.85.26-.37 0-.65-.14-.65-.65V9.47c0-.17-.14-.31-.31-.31h-1.27c-.17 0-.31.14-.31.31v8.17c0 1.19.65 1.88 1.78 1.88.31 0 .62-.08.91-.23l1.95-1.12c.48-.28.78-.8.78-1.36V8.39c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z" />
                            </svg>
                          </div>
                        )}
                        {skill.name === "Python" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-blue-500 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.2 0-.38.09-.5.25-.12.16-.18.38-.18.61 0 .22.06.44.18.61.12.16.3.25.5.25.18 0 .35-.09.46-.25.12-.17.18-.39.18-.61 0-.23-.06-.45-.18-.61a.58.58 0 0 0-.46-.25z" />
                            </svg>
                          </div>
                        )}
                        {skill.name === "PostgreSQL" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              PG
                            </span>
                          </div>
                        )}
                        {skill.name === "AWS" && (
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.071-.2.071-.08 0-.16-.04-.239-.112a2.417 2.417 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.591-.894-.591-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.27 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.297-.367-.279 0-.567.032-.863.104-.296.064-.583.16-.863.272-.128.056-.224.088-.279.104-.056.016-.096.024-.128.024-.112 0-.168-.08-.168-.248v-.391c0-.128.016-.224.056-.28.04-.064.112-.12.207-.176.279-.144.614-.264 1.005-.36.391-.095.807-.144 1.246-.144.95 0 1.644.216 2.091.647.439.432.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .535-.048.822-.144.287-.096.543-.271.758-.503.128-.144.224-.304.272-.48.048-.175.08-.384.08-.622v-.3c-.24-.064-.487-.112-.75-.144-.263-.032-.518-.048-.774-.048-.55 0-.958.112-1.229.335-.27.224-.407.543-.407.958 0 .384.095.67.295.862.2.191.487.286.933.286zm5.362.999c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L6.52 5.619c-.048-.16-.072-.263-.072-.32 0-.128.064-.2.191-.2h.783c.151 0 .255.024.31.08.065.048.113.16.161.311l1.518 5.98 1.406-5.98c.04-.16.088-.263.153-.311.064-.056.175-.08.318-.08h.638c.151 0 .255.024.318.08.065.048.12.16.153.311l1.422 6.04 1.597-6.04c.048-.16.104-.263.16-.311.065-.056.16-.08.312-.08h.742c.128 0 .2.064.2.2 0 .04-.009.08-.017.128-.008.048-.024.112-.056.2l-2.226 7.136c-.048.16-.104.263-.168.311-.064.056-.168.08-.312.08h-.686c-.151 0-.255-.024-.318-.08-.065-.048-.12-.16-.153-.311L9.77 9.015 8.38 11.758c-.04.16-.088.263-.153.311-.064.056-.175.08-.318.08H5.885zm8.59.215c-.383 0-.766-.045-1.142-.128-.383-.08-.68-.2-.893-.343-.128-.08-.215-.168-.247-.24-.032-.08-.048-.16-.048-.24v-.407c0-.168.064-.248.183-.248.048 0 .096.008.144.024.048.016.12.048.2.08.279.128.575.224.886.272.319.048.63.08.942.08.502 0 .894-.088 1.165-.264.279-.176.415-.423.415-.742 0-.215-.08-.4-.24-.558-.159-.159-.454-.304-.877-.423l-1.261-.399c-.638-.2-1.102-.495-1.397-.886-.287-.391-.438-.83-.438-1.317 0-.383.08-.718.24-1.005.159-.287.375-.535.646-.742.27-.2.574-.36.917-.455.343-.104.702-.144 1.078-.144.16 0 .327.008.51.032.184.016.36.048.535.08.168.04.327.08.479.128.151.048.27.096.36.144.127.08.215.16.263.24.048.08.08.175.08.288v.375c0 .168-.065.256-.184.256-.064 0-.168-.024-.304-.08-.455-.2-.967-.304-1.525-.304-.454 0-.815.072-1.070.216-.263.144-.391.36-.391.655 0 .216.087.4.255.558.168.159.48.32.933.439l1.237.4c.622.2 1.07.479 1.342.838.27.36.407.782.407 1.277 0 .391-.08.742-.24 1.045-.159.304-.375.567-.646.79-.27.215-.574.384-.917.494-.351.127-.726.191-1.117.191z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Nom de la technologie */}
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 relative z-10">
                        {skill.name}
                      </h3>

                      {/* Barre de progression visible */}
                      <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2 relative z-10">
                        <motion.div
                          className={`h-2 rounded-full ${skill.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </div>

                      {/* Pourcentage */}
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 relative z-10">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-indigo-50/80 dark:from-gray-900/80 to-transparent z-20" />
              <div />
            </div>
          </div>

          {/* Stats techniques */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  number: "5+",
                  label: "Années d'expérience",
                  color: "text-blue-600 dark:text-blue-400",
                  bg: "bg-blue-100 dark:bg-blue-900/50",
                },
                {
                  number: "50+",
                  label: "Projets réalisés",
                  color: "text-green-600 dark:text-green-400",
                  bg: "bg-green-100 dark:bg-green-900/50",
                },
                {
                  number: "15+",
                  label: "Technologies",
                  color: "text-purple-600 dark:text-purple-400",
                  bg: "bg-purple-100 dark:bg-purple-900/50",
                },
                {
                  number: "98%",
                  label: "Satisfaction client",
                  color: "text-orange-600 dark:text-orange-400",
                  bg: "bg-orange-100 dark:bg-orange-900/50",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${stat.bg} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {t('home.recentProjects', 'Projets Récents')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('home.recentProjectsDesc', 'Découvrez quelques-unes de mes réalisations les plus remarquables')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover-lift group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Voir le projet
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12 flex justify-center items-center"
          >
            <Link to="/services" className="btn-primary">
              Voir tous les projets
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Articles Récents
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez mes dernières réflexions sur le développement web
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover-lift group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">
                      {new Date(post.publishedAt).toLocaleDateString("fr-FR")}
                    </span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min de lecture</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Lire la suite
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/blog" className="btn-primary">
              Voir tous les articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transformons ensemble vos idées en solutions numériques
              exceptionnelles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Discutons de votre projet
              </Link>
              <Link
                to="/services"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                Découvrir mes services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
