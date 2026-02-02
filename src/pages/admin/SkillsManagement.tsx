import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Settings,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent } from "../../components/ui/Card";
import {
  useSkills,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from "../../api/skills";

interface Skill {
  id: string;
  name: string;
  category: string;
}

const CATEGORIES = [
  { value: "Frontend", label: "Frontend", icon: Code2, color: "blue" },
  { value: "Backend", label: "Backend", icon: Database, color: "green" },
  { value: "Database", label: "Base de données", icon: Database, color: "orange" },
  { value: "DevOps", label: "DevOps", icon: Cloud, color: "purple" },
  { value: "Mobile", label: "Mobile", icon: Smartphone, color: "pink" },
  { value: "Design", label: "Design", icon: Palette, color: "indigo" },
  { value: "Tools", label: "Outils", icon: Settings, color: "gray" },
];

function SkillsManagement() {
  const { data, isLoading } = useSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "Frontend" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const skills: Skill[] = data?.data || [];

  // Filter skills
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({ name: "", category: "Frontend" });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category });
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    if (editingSkill) {
      await updateSkill.mutateAsync({ id: editingSkill.id, ...formData });
    } else {
      await createSkill.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteSkill.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const getCategoryConfig = (category: string) => {
    return CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
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
            Compétences
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez vos compétences techniques ({skills.length} au total)
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une compétence
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher une compétence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Tous
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.value
                      ? `bg-${cat.color}-100 text-${cat.color}-700 dark:bg-${cat.color}-900/30 dark:text-${cat.color}-400`
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      {Object.keys(groupedSkills).length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Code2 className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Aucune compétence trouvée
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory
                ? "Essayez de modifier vos filtres"
                : "Commencez par ajouter vos compétences techniques"}
            </p>
            {!searchTerm && !selectedCategory && (
              <Button onClick={openCreateModal}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une compétence
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const config = getCategoryConfig(category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg bg-${config.color}-100 dark:bg-${config.color}-900/30`}>
                    <config.icon className={`w-4 h-4 text-${config.color}-600 dark:text-${config.color}-400`} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {config.label}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({categorySkills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative"
                    >
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow`}>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(skill)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                          {deleteConfirm === skill.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(skill.id)}
                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              >
                                <X className="w-3.5 h-3.5 text-gray-500" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(skill.id)}
                              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingSkill ? "Modifier la compétence" : "Nouvelle compétence"}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de la compétence
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: React, Node.js, Docker..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.value })}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all ${
                          formData.category === cat.value
                            ? `border-${cat.color}-500 bg-${cat.color}-50 dark:bg-${cat.color}-900/20`
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <cat.icon className={`w-4 h-4 text-${cat.color}-600 dark:text-${cat.color}-400`} />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {cat.label}
                        </span>
                      </button>
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
                  disabled={!formData.name.trim() || createSkill.isPending || updateSkill.isPending}
                >
                  {(createSkill.isPending || updateSkill.isPending) && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {editingSkill ? "Enregistrer" : "Créer"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillsManagement;
