import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SEO from '../components/common/SEO';
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
  Star,
  ExternalLink,
  Github,
  Calendar,
  DollarSign,
  MessageSquare
} from 'lucide-react';

const Services = () => {
  const { projects } = useAppContext();

  const services = [
    {
      icon: Globe,
      title: 'Développement Web Frontend',
      description: 'Applications web modernes et responsive avec les dernières technologies',
      features: ['React, Vue.js, Angular', 'TypeScript & JavaScript', 'Responsive Design', 'Performance optimisée', 'SEO-friendly', 'PWA Development'],
      price: 'À partir de 2500€',
      duration: '4-8 semaines',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Code2,
      title: 'Développement Backend & API',
      description: 'APIs robustes et architectures scalables pour vos applications',
      features: ['Node.js, Python, PHP', 'REST & GraphQL APIs', 'Base de données design', 'Authentification sécurisée', 'Tests automatisés', 'Documentation complète'],
      price: 'À partir de 3000€',
      duration: '6-10 semaines',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Smartphone,
      title: 'Applications Mobiles',
      description: 'Applications natives et cross-platform pour iOS et Android',
      features: ['React Native, Flutter', 'Design natif', 'Intégrations API', 'Push notifications', 'App Store deployment', 'Maintenance incluse'],
      price: 'À partir de 4000€',
      duration: '8-12 semaines',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'Architecture & Bases de Données',
      description: 'Conception d\'architectures scalables et optimisation de performances',
      features: ['Microservices', 'PostgreSQL, MongoDB', 'Cache & optimisation', 'Sécurité avancée', 'Monitoring', 'Backup & recovery'],
      price: 'À partir de 3500€',
      duration: '6-10 semaines',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Cloud,
      title: 'DevOps & Déploiement',
      description: 'Déploiement automatisé et infrastructure cloud',
      features: ['CI/CD pipelines', 'Docker, Kubernetes', 'AWS, Azure, GCP', 'Monitoring & logging', 'Auto-scaling', 'Support 24/7'],
      price: 'À partir de 2000€',
      duration: '3-6 semaines',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Consultation & Audit',
      description: 'Audit technique et conseil stratégique pour vos projets',
      features: ['Audit de code', 'Analyse de performance', 'Stratégie technique', 'Formation équipe', 'Best practices', 'Recommandations'],
      price: 'À partir de 1500€',
      duration: '2-4 semaines',
      color: 'from-red-500 to-red-600'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Découverte',
      description: 'Analyse de vos besoins et définition des objectifs',
      icon: MessageSquare
    },
    {
      number: '02',
      title: 'Planification',
      description: 'Création du cahier des charges et planning détaillé',
      icon: Calendar
    },
    {
      number: '03',
      title: 'Développement',
      description: 'Développement itératif avec feedback régulier',
      icon: Code2
    },
    {
      number: '04',
      title: 'Livraison',
      description: 'Tests, déploiement et formation utilisateur',
      icon: Zap
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Martin',
      company: 'TechStart',
      rating: 5,
      text: 'Travail exceptionnel ! L\'application développée a dépassé toutes nos attentes. Communication parfaite tout au long du projet.'
    },
    {
      name: 'Thomas Dubois',
      company: 'E-Commerce Plus',
      rating: 5,
      text: 'Très professionnel et réactif. L\'API développée gère parfaitement notre trafic important. Je recommande vivement !'
    },
    {
      name: 'Marie Leroy',
      company: 'StartupTech',
      rating: 5,
      text: 'Excellent développeur ! Il a su comprendre nos besoins spécifiques et livrer une solution parfaitement adaptée.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="Services"
        description="Services de développement web et mobile. Création d'applications React, API Node.js, applications mobiles et consultation technique."
        keywords={['services', 'développement web', 'application mobile', 'API', 'consultation', 'freelance']}
        url="/services"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Mes <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Des solutions complètes de développement web et mobile pour transformer 
              vos idées en produits numériques performants
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Qualité garantie
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Support inclus
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Livraison respectée
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover-lift group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Inclus dans ce service :</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-700">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span className="font-semibold text-blue-600">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center btn-primary text-sm"
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Mon Processus de Travail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de vos projets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Mes Réalisations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-uns des projets que j'ai eu le plaisir de réaliser
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover-lift group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
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
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
                        className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Ce que disent mes clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La satisfaction client est ma priorité absolue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 text-sm">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Discutons de vos besoins et créons ensemble une solution qui dépasse vos attentes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                Demander un devis gratuit
              </Link>
              <Link to="/" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white hover:text-blue-600">
                Voir mes réalisations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;