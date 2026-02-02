import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Briefcase,
  MapPin,
  Calendar,
  X,
  Check,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "../../api/experiences";

interface Experience {
  id: string;
  title: { fr: string; en: string };
  company: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  description: { fr: string; en: string };
  technologies: string[];
}

const emptyForm: Omit<Experience, "id"> = {
  title: { fr: "", en: "" },
  company: "",
  location: "",
  startDate: "",
  endDate: null,
  description: { fr: "", en: "" },
  technologies: [],
};

function ExperiencesManagement() {
  const { data, isLoading } = useExperiences();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, "id">>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentJob, setCurrentJob] = useState(false);

  const experiences: Experience[] = data?.data || [];

  // Sort by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  // Filter experiences
  const filteredExperiences = sortedExperiences.filter((exp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      exp.title.fr.toLowerCase().includes(searchLower) ||
      exp.title.en.toLowerCase().includes(searchLower) ||
      exp.company.toLowerCase().includes(searchLower) ||
      exp.technologies.some((t) => t.toLowerCase().includes(searchLower))
    );
  });

  const openCreateModal = () => {
    setEditingExperience(null);
    setFormData(emptyForm);
    setCurrentJob(false);
    setIsModalOpen(true);
  };

  const openEditModal = (exp: Experience) => {
    setEditingExperience(exp);
    setFormData({
      title: exp.title,
      company: exp.company,
      location: exp.location || "",
      startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.split("T")[0] : null,
      description: exp.description,
      technologies: exp.technologies,
    });
    setCurrentJob(!exp.endDate);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      endDate: currentJob ? null : formData.endDate,
    };

    if (editingExperience) {
      await updateExperience.mutateAsync({ id: editingExperience.id, ...payload });
    } else {
      await createExperience.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteExperience.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
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
            Expériences
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre parcours professionnel ({experiences.length} expériences)
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une expérience
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par titre, entreprise ou technologie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Experiences List */}
      {filteredExperiences.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune expérience trouvée
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm
                ? "Essayez de modifier votre recherche"
                : "Commencez par ajouter votre parcours professionnel"}
            </p>
            {!searchTerm && (
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une expérience
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {exp.title.fr}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">
                            {exp.company}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                {exp.location}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Présent"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(exp);
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                        {deleteConfirm === exp.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(exp.id);
                              }}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(null);
                              }}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(exp.id);
                            }}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                        {expandedId === exp.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    {exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 dark:border-gray-800"
                      >
                        <div className="p-6 bg-gray-50 dark:bg-gray-800/30">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Description (FR)
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                {exp.description.fr || "Non renseigné"}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Description (EN)
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                {exp.description.en || "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingExperience ? "Modifier l'expérience" : "Nouvelle expérience"}
                </h2>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Company & Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Entreprise *
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Localisation
                    </label>
                    <Input
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                {/* Title FR/EN */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Poste (FR) *
                    </label>
                    <Input
                      value={formData.title.fr}
                      onChange={(e) =>
                        setFormData({ ...formData, title: { ...formData.title, fr: e.target.value } })
                      }
                      placeholder="Développeur Full-Stack"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Poste (EN) *
                    </label>
                    <Input
                      value={formData.title.en}
                      onChange={(e) =>
                        setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })
                      }
                      placeholder="Full-Stack Developer"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date de début *
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date de fin
                    </label>
                    <div className="space-y-2">
                      <Input
                        type="date"
                        value={formData.endDate || ""}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        disabled={currentJob}
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentJob}
                          onChange={(e) => setCurrentJob(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Poste actuel
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Description FR/EN */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description (FR)
                    </label>
                    <textarea
                      value={formData.description.fr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, fr: e.target.value },
                        })
                      }
                      placeholder="Décrivez vos missions et réalisations..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description (EN)
                    </label>
                    <textarea
                      value={formData.description.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description, en: e.target.value },
                        })
                      }
                      placeholder="Describe your missions and achievements..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies utilisées
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                      placeholder="Ajouter une technologie..."
                    />
                    <Button type="button" onClick={addTechnology} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="hover:text-blue-900 dark:hover:text-blue-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    !formData.title.fr ||
                    !formData.title.en ||
                    !formData.company ||
                    !formData.startDate ||
                    createExperience.isPending ||
                    updateExperience.isPending
                  }
                >
                  {(createExperience.isPending || updateExperience.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingExperience ? "Enregistrer" : "Créer"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExperiencesManagement;
