import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  GraduationCap,
  Calendar,
  X,
  Check,
  Building,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import {
  useEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from "../../api/education";

interface Education {
  id: string;
  degree: { fr: string; en: string };
  institution: string;
  startDate: string;
  endDate?: string | null;
  description?: { fr: string; en: string } | null;
}

const emptyForm: Omit<Education, "id"> = {
  degree: { fr: "", en: "" },
  institution: "",
  startDate: "",
  endDate: null,
  description: { fr: "", en: "" },
};

function EducationManagement() {
  const { data, isLoading } = useEducation();
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Omit<Education, "id">>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inProgress, setInProgress] = useState(false);

  const educationList: Education[] = data?.data || [];

  // Sort by date (most recent first)
  const sortedEducation = [...educationList].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateB - dateA;
  });

  // Filter education
  const filteredEducation = sortedEducation.filter((edu) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      edu.degree.fr.toLowerCase().includes(searchLower) ||
      edu.degree.en.toLowerCase().includes(searchLower) ||
      edu.institution.toLowerCase().includes(searchLower)
    );
  });

  const openCreateModal = () => {
    setEditingEducation(null);
    setFormData(emptyForm);
    setInProgress(false);
    setIsModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingEducation(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      startDate: edu.startDate ? edu.startDate.split("T")[0] : "",
      endDate: edu.endDate ? edu.endDate.split("T")[0] : null,
      description: edu.description || { fr: "", en: "" },
    });
    setInProgress(!edu.endDate);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      endDate: inProgress ? null : formData.endDate,
    };

    if (editingEducation) {
      await updateEducation.mutateAsync({ id: editingEducation.id, ...payload });
    } else {
      await createEducation.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteEducation.mutateAsync(id);
    setDeleteConfirm(null);
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
            Formation
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre parcours académique ({educationList.length} formations)
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une formation
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par diplôme ou établissement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education List */}
      {filteredEducation.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune formation trouvée
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm
                ? "Essayez de modifier votre recherche"
                : "Commencez par ajouter votre parcours académique"}
            </p>
            {!searchTerm && (
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une formation
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredEducation.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {edu.degree.fr}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {edu.institution}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "En cours"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(edu);
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>
                        {deleteConfirm === edu.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(edu.id);
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
                              setDeleteConfirm(edu.id);
                            }}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                        {edu.description && (edu.description.fr || edu.description.en) ? (
                          expandedId === edu.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === edu.id && edu.description && (edu.description.fr || edu.description.en) && (
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
                                {edu.description?.fr || "Non renseigné"}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                Description (EN)
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                {edu.description?.en || "Not specified"}
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
                  {editingEducation ? "Modifier la formation" : "Nouvelle formation"}
                </h2>
              </div>

              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Établissement *
                  </label>
                  <Input
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Nom de l'école ou université"
                  />
                </div>

                {/* Degree FR/EN */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Diplôme (FR) *
                    </label>
                    <Input
                      value={formData.degree.fr}
                      onChange={(e) =>
                        setFormData({ ...formData, degree: { ...formData.degree, fr: e.target.value } })
                      }
                      placeholder="Master en Informatique"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Diplôme (EN) *
                    </label>
                    <Input
                      value={formData.degree.en}
                      onChange={(e) =>
                        setFormData({ ...formData, degree: { ...formData.degree, en: e.target.value } })
                      }
                      placeholder="Master's in Computer Science"
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
                        disabled={inProgress}
                      />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inProgress}
                          onChange={(e) => setInProgress(e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          En cours
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
                      value={formData.description?.fr || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description!, fr: e.target.value },
                        })
                      }
                      placeholder="Décrivez votre formation, spécialisation..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description (EN)
                    </label>
                    <textarea
                      value={formData.description?.en || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: { ...formData.description!, en: e.target.value },
                        })
                      }
                      placeholder="Describe your studies, specialization..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                    !formData.degree.fr ||
                    !formData.degree.en ||
                    !formData.institution ||
                    !formData.startDate ||
                    createEducation.isPending ||
                    updateEducation.isPending
                  }
                >
                  {(createEducation.isPending || updateEducation.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingEducation ? "Enregistrer" : "Créer"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EducationManagement;
