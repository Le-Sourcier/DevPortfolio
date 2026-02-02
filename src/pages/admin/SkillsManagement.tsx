import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Smartphone, Palette, Settings, X } from "lucide-react";
import { useSkills, useCreateSkill, useUpdateSkill, useDeleteSkill } from "../../api/skills";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  Modal,
  ModalBody,
  ModalFooter,
  FormField,
  FormInput,
  ActionButton,
  LoadingScreen,
} from "../../components/admin/ui";

interface Skill {
  id: string;
  name: string;
  category: string;
}

const CATEGORIES = [
  { value: "Frontend", label: "Frontend", icon: Code2 },
  { value: "Backend", label: "Backend", icon: Database },
  { value: "Database", label: "Base de données", icon: Database },
  { value: "DevOps", label: "DevOps", icon: Cloud },
  { value: "Mobile", label: "Mobile", icon: Smartphone },
  { value: "Design", label: "Design", icon: Palette },
  { value: "Tools", label: "Outils", icon: Settings },
];

export default function SkillsManagement() {
  const { data, isLoading } = useSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "Frontend" });

  const skills: Skill[] = data?.data || [];

  // Filter skills
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const openCreate = () => {
    setEditingSkill(null);
    setFormData({ name: "", category: "Frontend" });
    setIsModalOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const getCategoryConfig = (category: string) => {
    return CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Compétences"
        description="Gérez vos compétences techniques"
        count={skills.length}
        icon={Code2}
        actionLabel="Ajouter"
        onAction={openCreate}
      />

      {/* Filters */}
      <div className="space-y-4 mb-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher une compétence..."
        />

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              !selectedCategory
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Tous
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.value
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {Object.keys(groupedSkills).length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={Code2}
            title="Aucune compétence"
            description={searchTerm || selectedCategory ? "Modifiez vos filtres" : "Ajoutez vos compétences techniques"}
            actionLabel="Ajouter une compétence"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const config = getCategoryConfig(category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <config.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                    {config.label}
                  </h2>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    ({categorySkills.length})
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative"
                    >
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>

                        {/* Actions on hover */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(skill)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? "Modifier la compétence" : "Nouvelle compétence"}
        size="sm"
      >
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="space-y-5">
              <FormField label="Nom" required>
                <FormInput
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  placeholder="React, Node.js, Docker..."
                  required
                />
              </FormField>

              <FormField label="Catégorie">
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all text-left ${
                        formData.category === cat.value
                          ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <cat.icon className="w-4 h-4 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </FormField>
            </div>
          </ModalBody>

          <ModalFooter>
            <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createSkill.isPending || updateSkill.isPending}
              disabled={!formData.name.trim()}
            >
              {editingSkill ? "Enregistrer" : "Créer"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
