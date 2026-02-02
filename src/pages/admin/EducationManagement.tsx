import { useState } from "react";
import { GraduationCap, Building, Calendar } from "lucide-react";
import { useEducation, useCreateEducation, useUpdateEducation, useDeleteEducation } from "../../api/education";
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
  DataCardMeta,
  LoadingScreen,
} from "../../components/admin/ui";

interface Education {
  id: string;
  degree: { fr: string; en: string };
  institution: string;
  startDate: string;
  endDate?: string | null;
  description?: { fr: string; en: string } | null;
}

interface FormData {
  degreeFr: string;
  degreeEn: string;
  institution: string;
  startDate: string;
  endDate: string;
  descriptionFr: string;
  descriptionEn: string;
  inProgress: boolean;
}

const getInitialFormData = (edu?: Education | null): FormData => ({
  degreeFr: edu?.degree?.fr || "",
  degreeEn: edu?.degree?.en || "",
  institution: edu?.institution || "",
  startDate: edu?.startDate ? edu.startDate.split("T")[0] : "",
  endDate: edu?.endDate ? edu.endDate.split("T")[0] : "",
  descriptionFr: edu?.description?.fr || "",
  descriptionEn: edu?.description?.en || "",
  inProgress: !edu?.endDate,
});

export default function EducationManagement() {
  const { data, isLoading } = useEducation();
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [formData, setFormData] = useState<FormData>(getInitialFormData());

  const educationList: Education[] = data?.data || [];

  // Sort by date (most recent first)
  const sortedEducation = [...educationList].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const filteredEducation = sortedEducation.filter((edu) =>
    edu.degree.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    edu.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => {
    setEditingEdu(null);
    setFormData(getInitialFormData());
    setIsModalOpen(true);
  };

  const openEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData(getInitialFormData(edu));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      degree: { fr: formData.degreeFr, en: formData.degreeEn },
      institution: formData.institution,
      startDate: formData.startDate,
      endDate: formData.inProgress ? null : formData.endDate || null,
      description: formData.descriptionFr || formData.descriptionEn
        ? { fr: formData.descriptionFr, en: formData.descriptionEn }
        : null,
    };

    if (editingEdu) {
      await updateEducation.mutateAsync({ id: editingEdu.id, ...payload });
    } else {
      await createEducation.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteEducation.mutateAsync(id);
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
        title="Formation"
        description="Gérez votre parcours académique"
        count={educationList.length}
        icon={GraduationCap}
        actionLabel="Ajouter"
        onAction={openCreate}
      />

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher une formation..."
        />
      </div>

      {/* Education List */}
      {filteredEducation.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={GraduationCap}
            title="Aucune formation"
            description={searchTerm ? "Modifiez votre recherche" : "Ajoutez votre parcours académique"}
            actionLabel="Ajouter une formation"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEducation.map((edu, index) => (
            <DataCard
              key={edu.id}
              index={index}
              onEdit={() => openEdit(edu)}
              onDelete={() => handleDelete(edu.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <DataCardTitle>{edu.degree.fr}</DataCardTitle>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    {edu.institution}
                  </p>

                  <DataCardMeta>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "En cours"}
                    </span>
                  </DataCardMeta>

                  {edu.description?.fr && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {edu.description.fr}
                    </p>
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
        title={editingEdu ? "Modifier la formation" : "Nouvelle formation"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="space-y-5">
              {/* Institution */}
              <FormField label="Établissement" required>
                <FormInput
                  value={formData.institution}
                  onChange={(v) => updateField("institution", v)}
                  placeholder="Université, École..."
                  required
                />
              </FormField>

              {/* Degrees */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Diplôme (FR)" required>
                  <FormInput
                    value={formData.degreeFr}
                    onChange={(v) => updateField("degreeFr", v)}
                    placeholder="Master en Informatique"
                    required
                  />
                </FormField>
                <FormField label="Degree (EN)" required>
                  <FormInput
                    value={formData.degreeEn}
                    onChange={(v) => updateField("degreeEn", v)}
                    placeholder="Master in Computer Science"
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
                    disabled={formData.inProgress}
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.inProgress}
                      onChange={(e) => updateField("inProgress", e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 focus:ring-gray-900 dark:focus:ring-white"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      En cours
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
                    placeholder="Spécialisation, projets..."
                    rows={3}
                  />
                </FormField>
                <FormField label="Description (EN)">
                  <FormTextarea
                    value={formData.descriptionEn}
                    onChange={(v) => updateField("descriptionEn", v)}
                    placeholder="Specialization, projects..."
                    rows={3}
                  />
                </FormField>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createEducation.isPending || updateEducation.isPending}
            >
              {editingEdu ? "Enregistrer" : "Créer"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
