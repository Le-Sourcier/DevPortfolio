// admin/settings
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Palette,
  Shield,
  Save,
  Loader2,
  FileText,
  Search,
  Link as LinkIcon,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import { useSiteSettings, useUpdateSiteSettings } from "../../api/settings";
import { SiteSettings } from "../../types/models";

function Settings() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const [formData, setFormData] = useState<Partial<SiteSettings>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleNestedChange = (parent: string, key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value },
    }));
    setSaved(false);
  };

  const handleSubmit = async () => {
    await updateSettings.mutateAsync(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Paramètres
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configuration générale de votre portfolio
          </p>
        </div>
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2"
        >
          {updateSettings.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Enregistré !" : "Enregistrer"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Informations générales
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom du site
                  </label>
                  <Input
                    value={formData.siteName || ""}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    placeholder="Mon Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email de contact
                  </label>
                  <Input
                    type="email"
                    value={formData.emailContact || ""}
                    onChange={(e) => handleChange("emailContact", e.target.value)}
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                Section Hero
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre (FR)
                    </label>
                    <Input
                      value={formData.heroTitle?.fr || ""}
                      onChange={(e) => handleNestedChange("heroTitle", "fr", e.target.value)}
                      placeholder="Bonjour, je suis..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre (EN)
                    </label>
                    <Input
                      value={formData.heroTitle?.en || ""}
                      onChange={(e) => handleNestedChange("heroTitle", "en", e.target.value)}
                      placeholder="Hi, I am..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sous-titre (FR)
                    </label>
                    <Input
                      value={formData.heroSubtitle?.fr || ""}
                      onChange={(e) => handleNestedChange("heroSubtitle", "fr", e.target.value)}
                      placeholder="Développeur Full-Stack"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sous-titre (EN)
                    </label>
                    <Input
                      value={formData.heroSubtitle?.en || ""}
                      onChange={(e) => handleNestedChange("heroSubtitle", "en", e.target.value)}
                      placeholder="Full-Stack Developer"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* SEO Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                SEO & Métadonnées
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre SEO (FR)
                    </label>
                    <Input
                      value={formData.seoTitle?.fr || ""}
                      onChange={(e) => handleNestedChange("seoTitle", "fr", e.target.value)}
                      placeholder="Portfolio Développeur"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre SEO (EN)
                    </label>
                    <Input
                      value={formData.seoTitle?.en || ""}
                      onChange={(e) => handleNestedChange("seoTitle", "en", e.target.value)}
                      placeholder="Developer Portfolio"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description SEO (FR)
                    </label>
                    <textarea
                      value={formData.seoDescription?.fr || ""}
                      onChange={(e) => handleNestedChange("seoDescription", "fr", e.target.value)}
                      placeholder="Description pour les moteurs de recherche..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description SEO (EN)
                    </label>
                    <textarea
                      value={formData.seoDescription?.en || ""}
                      onChange={(e) => handleNestedChange("seoDescription", "en", e.target.value)}
                      placeholder="Description for search engines..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CV/Resume Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <LinkIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                CV / Resume
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL du CV (Français)
                  </label>
                  <Input
                    type="url"
                    value={formData.cvUrlFr || ""}
                    onChange={(e) => handleChange("cvUrlFr", e.target.value)}
                    placeholder="https://drive.google.com/file/cv-fr.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lien vers votre CV en français (Google Drive, Dropbox, etc.)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL du CV (English)
                  </label>
                  <Input
                    type="url"
                    value={formData.cvUrlEn || ""}
                    onChange={(e) => handleChange("cvUrlEn", e.target.value)}
                    placeholder="https://drive.google.com/file/cv-en.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Link to your English resume
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                Réseaux sociaux
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub
                  </label>
                  <Input
                    type="url"
                    value={formData.githubUrl || ""}
                    onChange={(e) => handleChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  <Input
                    type="url"
                    value={formData.linkedinUrl || ""}
                    onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter / X
                  </label>
                  <Input
                    type="url"
                    value={formData.twitterUrl || ""}
                    onChange={(e) => handleChange("twitterUrl", e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance & Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                  <Palette className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                Apparence & Statut
              </h3>
              <div className="space-y-6">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Couleur principale
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "blue", class: "bg-blue-500" },
                      { name: "purple", class: "bg-purple-500" },
                      { name: "green", class: "bg-green-500" },
                      { name: "orange", class: "bg-orange-500" },
                      { name: "pink", class: "bg-pink-500" },
                      { name: "red", class: "bg-red-500" },
                      { name: "indigo", class: "bg-indigo-500" },
                      { name: "teal", class: "bg-teal-500" },
                    ].map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleChange("primaryColor", color.name)}
                        className={`w-10 h-10 ${color.class} rounded-xl shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center ${
                          formData.primaryColor === color.name
                            ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white"
                            : ""
                        }`}
                      >
                        {formData.primaryColor === color.name && (
                          <Check className="w-5 h-5 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Status */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.availableForWork ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <Shield className={`w-5 h-5 ${formData.availableForWork ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <span className="text-gray-900 dark:text-white font-medium block">
                          Disponible pour mission
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Affiche un badge "Disponible" sur votre site
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formData.availableForWork || false}
                        onChange={(e) => handleChange("availableForWork", e.target.checked)}
                      />
                      <div
                        className={`w-14 h-8 rounded-full transition-colors ${
                          formData.availableForWork
                            ? "bg-green-500"
                            : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform mt-1 ${
                            formData.availableForWork ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl shadow-lg"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">Paramètres enregistrés avec succès !</span>
        </motion.div>
      )}
    </div>
  );
}

export default Settings;
