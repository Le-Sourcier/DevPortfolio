// components/layout/Footer.tsx
import { Link, useLocation } from 'react-router-dom';
import { Code2, Github, Linkedin, Twitter, Mail, Heart, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useSiteSettings } from '../../api/settings';
import { useSubscribeNewsletter } from '../../api/newsletter';
import { useState } from 'react';

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: settings } = useSiteSettings();
  const subscribeNewsletter = useSubscribeNewsletter();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribeNewsletter.mutateAsync({ email });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Ne pas afficher le footer sur les pages admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const socialLinks = [
    { type: 'github', url: settings?.githubUrl, icon: Github },
    { type: 'linkedin', url: settings?.linkedinUrl, icon: Linkedin },
    { type: 'twitter', url: settings?.twitterUrl, icon: Twitter },
  ].filter(link => link.url);

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300">
                {settings?.siteName || "DevPortfolio"}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
              {t("footer.description")}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.type}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              {settings?.emailContact && (
                <a
                  href={`mailto:${settings.emailContact}`}
                  className="p-2 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t("footer.navigation")}</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('common.home') },
                { to: '/services', label: t('common.services') },
                { to: '/blog', label: t('common.blog') },
                { to: '/contact', label: t('common.contact') },
                { to: '/careers', label: t('common.careers') }
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t("footer.services")}</h3>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>{t("footer.webDevelopment")}</li>
              <li>{t("footer.mobileApps")}</li>
              <li>{t("footer.techConsulting")}</li>
              <li>{t("footer.training")}</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">{t("footerExtra.newsletter")}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t("footerExtra.newsletterDesc")}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footerExtra.emailPlaceholder")}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={subscribeNewsletter.isPending || status === 'success'}
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 transition-colors"
                >
                  {subscribeNewsletter.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {t("footerExtra.subscribeSuccess")}
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-600 dark:text-red-400">
                  {t("footerExtra.subscribeError")}
                </p>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {settings?.emailContact || "contact@example.com"}
              </p>
              <Link to="/contact" className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                {t("cta.discussProject")} &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <span>© {new Date().getFullYear()} {settings?.siteName}. {t("footer.madeWith")}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>{t("footer.by")} {settings?.siteName}</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t("footer.privacyPolicy")}
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t("footer.termsOfUse")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
