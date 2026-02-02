// admin/settings
import { useState, useEffect } from "react";
import {
  Globe,
  Users,
  Palette,
  Shield,
  Save,
  Loader2,
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

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value },
    }));
  };

  const handleSubmit = () => {
    updateSettings.mutate(formData);
  };

  if (isLoading) {
    return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-500">Configuration générale de l'application.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <div className="space-y-8">
          <Card>
             <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-blue-600" />
                  Informations générales
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom du site
                    </label>
                    <Input
                      value={formData.siteName || ""}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email de contact
                    </label>
                    <Input
                      type="email"
                      value={formData.emailContact || ""}
                      onChange={(e) => handleChange("emailContact", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Titre Hero (FR)
                      </label>
                      <Input
                        value={formData.heroTitle?.fr || ""}
                        onChange={(e) => handleNestedChange("heroTitle", "fr", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subtitle Hero (FR)
                      </label>
                      <Input
                        value={formData.heroSubtitle?.fr || ""}
                        onChange={(e) => handleNestedChange("heroSubtitle", "fr", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
             </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-green-600" />
                Réseaux sociaux
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Twitter
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
        </div>

        {/* Advanced Settings */}
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Palette className="w-6 h-6 mr-2 text-purple-600" />
                Apparence
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex space-x-3">
                    {["blue", "purple", "green", "orange", "pink"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleChange("primaryColor", color)}
                        className={`w-10 h-10 bg-${color}-500 rounded-full border-2 ${formData.primaryColor === color ? 'border-gray-900' : 'border-white'} shadow-lg hover:scale-110 transition-transform duration-200`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-red-600" />
                Statut
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-700 text-sm font-medium">Disponible pour mission</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-600"
                    checked={formData.availableForWork || false}
                    onChange={(e) => handleChange("availableForWork", e.target.checked)}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <Button size="lg" className="w-full md:w-auto" onClick={handleSubmit} isLoading={updateSettings.isPending}>
          <Save className="w-5 h-5 mr-2" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}

export default Settings;
