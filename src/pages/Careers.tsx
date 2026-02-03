import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Users,
  Coffee,
  Globe,
  Rocket,
  Code2,
  CheckCircle2
} from "lucide-react";
import SEO from "../components/common/SEO";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Link } from "react-router-dom";

const Careers = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === 'fr' ? 'fr' : 'en';

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer React/Next.js",
      type: "Full-time",
      location: "Remote / Lomé",
      department: "Engineering",
      description: "Nous recherchons un développeur passionné pour créer des interfaces utilisateur exceptionnelles.",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "Backend Developer Node.js",
      type: "Freelance / Contract",
      location: "Remote",
      department: "Engineering",
      description: "Participez à la conception d'APIs robustes et scalables pour nos clients internationaux.",
      tags: ["Node.js", "PostgreSQL", "AWS"]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Part-time",
      location: "Remote",
      department: "Design",
      description: "Créez des expériences utilisateurs intuitives et des maquettes modernes.",
      tags: ["Figma", "Design Systems", "Prototyping"]
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "100% Remote Friendly",
      description: "Travailler d'où vous voulez. Nous privilégions le résultat à la présence."
    },
    {
      icon: Clock,
      title: "Horaires Flexibles",
      description: "Gérez votre temps comme vous le souhaitez pour un meilleur équilibre vie pro/perso."
    },
    {
      icon: Rocket,
      title: "Projets Innovants",
      description: "Travaillez sur des technologies modernes et des projets stimulants."
    },
    {
      icon: Users,
      title: "Culture Collaborative",
      description: "Une équipe bienveillante, l'entraide et le partage de connaissances."
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Carrières - Rejoignez-nous"
        description="Opportunités de carrière et offres d'emploi. Rejoignez une équipe passionnée."
        url="/careers"
      />

      {/* Hero Section - Immersive */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -top-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 -top-20 bg-[url('/grid-pattern-white.svg')] opacity-5" />

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                We are hiring!
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Construisons le futur <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  ensemble
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Rejoignez une équipe pasionnée où innovation, créativité et bienveillance se rencontrent pour créer des produits d'exception.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-lg bg-white text-gray-900 hover:bg-gray-100 shadow-xl shadow-white/20"
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Voir les offres <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur">
                    Notre culture
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-white dark:fill-gray-950"
            />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
              Pourquoi nous rejoindre ?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Plus qu'un simple job
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nous offrons un environnement de travail stimulant où vous pouvez grandir, apprendre et avoir un impact réel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
             <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                Recrutement ouvert
              </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos opportunités actuelles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Trouvez le rôle qui correspond à vos ambitions et rejoignez l'aventure.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="group relative bg-white dark:bg-gray-950 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    <div className="space-y-4 flex-1">
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map(tag => (
                            <span key={tag} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 pt-4 md:pt-0 w-full md:w-auto">
                      <Link to={`/contact?subject=Candidature: ${job.title}&projectType=other`}>
                        <Button className="w-full md:w-auto rounded-xl px-6 h-12 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20">
                          Postuler maintenant <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Spontaneous Application */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 md:p-12 text-center"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-6">
                  <Coffee className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Vous ne trouvez pas le poste idéal ?
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  Nous sommes toujours à la recherche de talents exceptionnels. Envoyez-nous votre candidature spontanée et dites-nous comment vous pouvez faire la différence.
                </p>
                <Link to="/contact?subject=Candidature Spontanée&projectType=other">
                  <Button size="lg" className="rounded-full px-8 bg-white text-gray-900 hover:bg-gray-100 border-0">
                    Candidature spontanée
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
