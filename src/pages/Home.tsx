import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  ArrowRight, 
  Code2, 
  Smartphone, 
  Globe, 
  Users, 
  Star,
  Github,
  ExternalLink,
  Calendar,
  Clock
} from 'lucide-react';

const Home = () => {
  const { projects, blogPosts } = useAppContext();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const featuredPosts = blogPosts.filter(p => p.featured).slice(0, 2);

  const skills = [
    { name: 'React', level: 95, color: 'bg-blue-500' },
    { name: 'TypeScript', level: 90, color: 'bg-blue-600' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'Python', level: 80, color: 'bg-yellow-500' },
    { name: 'PostgreSQL', level: 88, color: 'bg-indigo-500' },
    { name: 'AWS', level: 75, color: 'bg-orange-500' }
  ];

  const services = [
    {
      icon: Globe,
      title: 'Développement Web',
      description: 'Applications web modernes et performantes avec React, Vue.js et les dernières technologies.',
      features: ['SPA/PWA', 'Responsive Design', 'Performance optimisée']
    },
    {
      icon: Smartphone,
      title: 'Applications Mobiles',
      description: 'Applications mobiles natives et cross-platform pour iOS et Android.',
      features: ['React Native', 'Flutter', 'App Store Deploy']
    },
    {
      icon: Code2,
      title: 'Backend & API',
      description: 'APIs robustes et scalables avec Node.js, Python et bases de données modernes.',
      features: ['REST/GraphQL', 'Microservices', 'Cloud Integration']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projets Réalisés' },
    { number: '30+', label: 'Clients Satisfaits' },
    { number: '5+', label: 'Années d\'Expérience' },
    { number: '100%', label: 'Engagement Qualité' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
                Disponible pour nouveaux projets
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Développeur</span>
                <br />
                <span className="text-gradient">Full-Stack</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Je crée des expériences web exceptionnelles et des applications 
                modernes qui transforment vos idées en réalité numérique.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link to="/contact" className="btn-primary">
                Démarrer un projet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/services" className="btn-secondary">
                Découvrir mes services
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
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Services Section */}
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
              Mes Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover-lift group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
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
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full text-blue-800 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
              Expertise Technique
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Mes Compétences
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Maîtrise des technologies modernes pour des solutions performantes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-500"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color} shadow-lg`} />
                      <span className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                    <motion.span 
                      className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.5, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200/60 rounded-full h-4 overflow-hidden shadow-inner">
                      <motion.div
                        className={`h-4 rounded-full ${skill.color} relative overflow-hidden shadow-lg`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 2, 
                          delay: index * 0.15 + 0.3,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      >
                        {/* Animated shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 2,
                            delay: index * 0.15 + 1.5,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Skill level indicator */}
                    <motion.div
                      className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg"
                      style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 2 }}
                      viewport={{ once: true }}
                    >
                      {skill.level}%
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Additional stats or certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center space-x-8 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Projets réalisés</div>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">Technologies maîtrisées</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
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
              Projets Récents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de mes réalisations les plus remarquables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-primary">
              Voir tous les projets
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Posts */}
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
              Articles Récents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez mes dernières réflexions sur le développement web
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover-lift group"
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
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{new Date(post.publishedAt).toLocaleDateString('fr-FR')}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min de lecture</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
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
              Transformons ensemble vos idées en solutions numériques exceptionnelles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
                Discutons de votre projet
              </Link>
              <Link to="/services" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white hover:text-blue-600">
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