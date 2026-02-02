import { useState } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { useExperiences, useCreateExperience, useUpdateExperience, useDeleteExperience } from "../../api/experiences";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  Modal,
  ModalBody,
  ModalFooter,
  FormField,
  FormInput,
  FormTextarea,
  ActionButton,
  DataCard,
  DataCardTitle,
  DataCardDescription,
  DataCardMeta,
  DataCardTags,
  LoadingScreen,
} from "../../components/admin/ui";

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

interface FormData {
  titleFr: string;
  titleEn: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  descriptionFr: string;
  descriptionEn: string;
  technologies: string;
  currentJob: boolean;
}

const getInitialFormData = (exp?: Experience | null): FormData => ({
  titleFr: exp?.title?.fr || "",
  titleEn: exp?.title?.en || "",
  company: exp?.company || "",
  location: exp?.location || "",
  startDate: exp?.startDate ? exp.startDate.split("T")[0] : "",
  endDate: exp?.endDate ? exp.endDate.split("T")[0] : "",
  descriptionFr: exp?.description?.fr || "",
  descriptionEn: exp?.description?.en || "",
  technologies: exp?.technologies?.join(", ") || "",
  currentJob: !exp?.endDate,
});

export default function ExperiencesManagement() {
  const { data, isLoading } = useExperiences();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const experiences: Experience[] = data?.data || [];

  // Sort by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const filteredExperiences = sortedExperiences.filter((exp) =>
    exp.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openCreate = () => {
    setEditingExp(null);
    setFormData(getInitialFormData());
    setIsModalOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData(getInitialFormData(exp));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { fr: formData.titleFr, en: formData.titleEn },
      company: formData.company,
      location: formData.location || undefined,
      startDate: formData.startDate,
      endDate: formData.currentJob ? null : formData.endDate || null,
      description: { fr: formData.descriptionFr, en: formData.descriptionEn },
      technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingExp) {
      await updateExperience.mutateAsync({ id: editingExp.id, ...payload });
    } else {
      await createExperience.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteExperience.mutateAsync(id);
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Expériences"
        description="Gérez votre parcours professionnel"
        count={experiences.length}
        icon={Briefcase}
        actionLabel="Ajouter"
        onAction={openCreate}
      />

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher une expérience..."
        />
      </div>

      {/* Experiences List */}
      {filteredExperiences.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={Briefcase}
            title="Aucune expérience"
            description={searchTerm ? "Modifiez votre recherche" : "Ajoutez votre parcours professionnel"}
            actionLabel="Ajouter une expérience"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExperiences.map((exp, index) => (
            <DataCard
              key={exp.id}
              index={index}
              onEdit={() => openEdit(exp)}
              onDelete={() => handleDelete(exp.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <DataCardTitle>{exp.title.fr}</DataCardTitle>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-0.5">
                    {exp.company}
                  </p>

                  <DataCardMeta>
                    {exp.location && (
                      <>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                        <span>·</span>
                      </>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Présent"}
                    </span>
                  </DataCardMeta>

                  {exp.description.fr && (
                    <DataCardDescription>{exp.description.fr}</DataCardDescription>
                  )}

                  {exp.technologies.length > 0 && (
                    <DataCardTags tags={exp.technologies} max={6} />
                  )}
                </div>
              </div>
            </DataCard>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? "Modifier l'expérience" : "Nouvelle expérience"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="space-y-5">
              {/* Company & Location */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Entreprise" required>
                  <FormInput
                    value={formData.company}
                    onChange={(v) => updateField("company", v)}
                    placeholder="Nom de l'entreprise"
                    required
                  />
                </FormField>
                <FormField label="Localisation">
                  <FormInput
                    value={formData.location}
                    onChange={(v) => updateField("location", v)}
                    placeholder="Paris, France"
                  />
                </FormField>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Poste (FR)" required>
                  <FormInput
                    value={formData.titleFr}
                    onChange={(v) => updateField("titleFr", v)}
                    placeholder="Développeur Full-Stack"
                    required
                  />
                </FormField>
                <FormField label="Position (EN)" required>
                  <FormInput
                    value={formData.titleEn}
                    onChange={(v) => updateField("titleEn", v)}
                    placeholder="Full-Stack Developer"
                    required
                  />
                </FormField>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Date de début" required>
                  <FormInput
                    type="date"
                    value={formData.startDate}
                    onChange={(v) => updateField("startDate", v)}
                    required
                  />
                </FormField>
                <FormField label="Date de fin">
                  <FormInput
                    type="date"
                    value={formData.endDate}
                    onChange={(v) => updateField("endDate", v)}
                    disabled={formData.currentJob}
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.currentJob}
                      onChange={(e) => updateField("currentJob", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 focus:ring-gray-900 dark:focus:ring-white"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Poste actuel
                    </span>
                  </label>
                </FormField>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Description (FR)">
                  <FormTextarea
                    value={formData.descriptionFr}
                    onChange={(v) => updateField("descriptionFr", v)}
                    placeholder="Vos missions..."
                    rows={4}
                  />
                </FormField>
                <FormField label="Description (EN)">
                  <FormTextarea
                    value={formData.descriptionEn}
                    onChange={(v) => updateField("descriptionEn", v)}
                    placeholder="Your responsibilities..."
                    rows={4}
                  />
                </FormField>
              </div>

              {/* Technologies */}
              <FormField label="Technologies" hint="Séparées par des virgules">
                <FormInput
                  value={formData.technologies}
                  onChange={(v) => updateField("technologies", v)}
                  placeholder="React, Node.js, PostgreSQL..."
                />
              </FormField>
            </div>
          </ModalBody>

          <ModalFooter>
            <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createExperience.isPending || updateExperience.isPending}
            >
              {editingExp ? "Enregistrer" : "Créer"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
