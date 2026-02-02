import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Globe, FileText, Search, Link as LinkIcon, Users, Palette, Check, Save } from "lucide-react";
import { useSiteSettings, useUpdateSiteSettings } from "../../api/settings";
import { SiteSettings } from "../../types/models";
import { PageHeader, FormField, FormInput, FormTextarea, ActionButton, LoadingScreen } from "../../components/admin/ui";

function SettingsPage() {
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
    return <LoadingScreen />;
  }

  const colors = [
    { name: "gray", class: "bg-gray-900" },
    { name: "blue", class: "bg-blue-600" },
    { name: "indigo", class: "bg-indigo-600" },
    { name: "violet", class: "bg-violet-600" },
    { name: "purple", class: "bg-purple-600" },
    { name: "pink", class: "bg-pink-600" },
    { name: "red", class: "bg-red-600" },
    { name: "orange", class: "bg-orange-600" },
    { name: "amber", class: "bg-amber-600" },
    { name: "green", class: "bg-green-600" },
    { name: "teal", class: "bg-teal-600" },
    { name: "cyan", class: "bg-cyan-600" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Paramètres"
        description="Configuration de votre portfolio"
        icon={SettingsIcon}
      />

      <div className="space-y-6">
        {/* General */}
        <Section icon={Globe} title="Informations générales">
          <div className="grid gap-5">
            <FormField label="Nom du site">
              <FormInput
                value={formData.siteName || ""}
                onChange={(v) => handleChange("siteName", v)}
                placeholder="Mon Portfolio"
              />
            </FormField>
            <FormField label="Email de contact">
              <FormInput
                type="email"
                value={formData.emailContact || ""}
                onChange={(v) => handleChange("emailContact", v)}
                placeholder="contact@example.com"
              />
            </FormField>
          </div>
        </Section>

        {/* Hero */}
        <Section icon={FileText} title="Section Hero">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Titre (FR)">
              <FormInput
                value={formData.heroTitle?.fr || ""}
                onChange={(v) => handleNestedChange("heroTitle", "fr", v)}
                placeholder="Bonjour, je suis..."
              />
            </FormField>
            <FormField label="Title (EN)">
              <FormInput
                value={formData.heroTitle?.en || ""}
                onChange={(v) => handleNestedChange("heroTitle", "en", v)}
                placeholder="Hi, I am..."
              />
            </FormField>
            <FormField label="Sous-titre (FR)">
              <FormInput
                value={formData.heroSubtitle?.fr || ""}
                onChange={(v) => handleNestedChange("heroSubtitle", "fr", v)}
                placeholder="Développeur Full-Stack"
              />
            </FormField>
            <FormField label="Subtitle (EN)">
              <FormInput
                value={formData.heroSubtitle?.en || ""}
                onChange={(v) => handleNestedChange("heroSubtitle", "en", v)}
                placeholder="Full-Stack Developer"
              />
            </FormField>
          </div>
        </Section>

        {/* SEO */}
        <Section icon={Search} title="SEO & Métadonnées">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="Titre SEO (FR)">
              <FormInput
                value={formData.seoTitle?.fr || ""}
                onChange={(v) => handleNestedChange("seoTitle", "fr", v)}
                placeholder="Portfolio Développeur"
              />
            </FormField>
            <FormField label="SEO Title (EN)">
              <FormInput
                value={formData.seoTitle?.en || ""}
                onChange={(v) => handleNestedChange("seoTitle", "en", v)}
                placeholder="Developer Portfolio"
              />
            </FormField>
            <FormField label="Description SEO (FR)">
              <FormTextarea
                value={formData.seoDescription?.fr || ""}
                onChange={(v) => handleNestedChange("seoDescription", "fr", v)}
                placeholder="Description pour les moteurs de recherche..."
                rows={2}
              />
            </FormField>
            <FormField label="SEO Description (EN)">
              <FormTextarea
                value={formData.seoDescription?.en || ""}
                onChange={(v) => handleNestedChange("seoDescription", "en", v)}
                placeholder="Description for search engines..."
                rows={2}
              />
            </FormField>
          </div>
        </Section>

        {/* CV */}
        <Section icon={LinkIcon} title="CV / Resume">
          <div className="grid md:grid-cols-2 gap-5">
            <FormField label="URL du CV (FR)" hint="Lien vers votre CV français">
              <FormInput
                type="url"
                value={formData.cvUrlFr || ""}
                onChange={(v) => handleChange("cvUrlFr", v)}
                placeholder="https://drive.google.com/..."
              />
            </FormField>
            <FormField label="CV URL (EN)" hint="Link to your English resume">
              <FormInput
                type="url"
                value={formData.cvUrlEn || ""}
                onChange={(v) => handleChange("cvUrlEn", v)}
                placeholder="https://drive.google.com/..."
              />
            </FormField>
          </div>
        </Section>

        {/* Social */}
        <Section icon={Users} title="Réseaux sociaux">
          <div className="grid md:grid-cols-3 gap-5">
            <FormField label="GitHub">
              <FormInput
                type="url"
                value={formData.githubUrl || ""}
                onChange={(v) => handleChange("githubUrl", v)}
                placeholder="https://github.com/..."
              />
            </FormField>
            <FormField label="LinkedIn">
              <FormInput
                type="url"
                value={formData.linkedinUrl || ""}
                onChange={(v) => handleChange("linkedinUrl", v)}
                placeholder="https://linkedin.com/in/..."
              />
            </FormField>
            <FormField label="Twitter / X">
              <FormInput
                type="url"
                value={formData.twitterUrl || ""}
                onChange={(v) => handleChange("twitterUrl", v)}
                placeholder="https://twitter.com/..."
              />
            </FormField>
          </div>
        </Section>

        {/* Appearance */}
        <Section icon={Palette} title="Apparence">
          <div className="space-y-6">
            {/* Color picker */}
            <FormField label="Couleur principale">
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleChange("primaryColor", color.name)}
                    className={`w-9 h-9 rounded-xl ${color.class} flex items-center justify-center transition-transform hover:scale-110 ${
                      formData.primaryColor === color.name ? "ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-gray-900" : ""
                    }`}
                  >
                    {formData.primaryColor === color.name && (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    )}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Availability toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Disponible pour mission
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Affiche un badge sur votre site
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChange("availableForWork", !formData.availableForWork)}
                className="relative"
              >
                <div className={`w-12 h-7 rounded-full transition-colors ${
                  formData.availableForWork ? "bg-gray-900 dark:bg-white" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <div className={`absolute top-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow transition-transform ${
                    formData.availableForWork ? "translate-x-6" : "translate-x-1"
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </Section>

        {/* Save button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end pt-4"
        >
          <ActionButton
            onClick={handleSubmit}
            loading={updateSettings.isPending}
            disabled={saved}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Enregistré
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Enregistrer
              </>
            )}
          </ActionButton>
        </motion.div>
      </div>
    </div>
  );
}

interface SectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <h2 className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}

export default SettingsPage;
