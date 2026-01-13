import { Link, useLocation } from 'react-router-dom';
import { Code2, Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Ne pas afficher le footer sur les pages admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">DevPortfolio</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.bio')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:scale-105 transform"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:scale-105 transform"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:scale-105 transform"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 hover:scale-105 transform"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('common.home') },
                { to: '/services', label: t('common.services') },
                { to: '/blog', label: t('common.blog') },
                { to: '/contact', label: t('common.contact') }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.services')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{t('services.service1.title')}</li>
              <li>{t('services.service3.title')}</li>
              <li>{t('footer.consulting')}</li>
              <li>{t('footer.training')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.contact')}</h3>
            <div className="space-y-2 text-gray-300">
              <p>contact@example.com</p>
              <p>+33 1 23 45 67 89</p>
              <p>Paris, France</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-gray-400">
              <span>© 2024 DevPortfolio. {t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('footer.by')} John Doe</span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
