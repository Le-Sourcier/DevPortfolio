import { useState } from "react";
import { Folder, ExternalLink, Github, Star } from "lucide-react";
import { useProjects, useCreateProject, useDeleteProject, useUpdateProject } from "../../api/projects";
import { Project } from "../../types/models";
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
  DataCardTags,
  LoadingScreen,
} from "../../components/admin/ui";

interface ProjectFormData {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string;
  repoUrl: string;
  featured: boolean;
}

const getInitialFormData = (project?: Project | null): ProjectFormData => ({
  titleFr: project?.title?.fr || "",
  titleEn: project?.title?.en || "",
  descriptionFr: project?.description?.fr || "",
  descriptionEn: project?.description?.en || "",
  technologies: project?.technologies?.join(", ") || "",
  imageUrl: project?.imageUrl || "",
  projectUrl: project?.projectUrl || "",
  repoUrl: project?.repoUrl || "",
  featured: project?.featured || false,
});

export default function ProjectsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<ProjectFormData>(getInitialFormData());

  const { data: projectsData, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const projects = (projectsData?.data || []) as Project[];
  const filteredProjects = projects.filter(p =>
    p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openCreate = () => {
    setEditingProject(null);
    setFormData(getInitialFormData());
    setIsModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormData(getInitialFormData(project));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { fr: formData.titleFr, en: formData.titleEn },
      description: { fr: formData.descriptionFr, en: formData.descriptionEn },
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
      projectUrl: formData.projectUrl,
      repoUrl: formData.repoUrl,
      featured: formData.featured,
    };

    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject.id, ...payload });
    } else {
      await createProject.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteProject.mutateAsync(id);
  };

  const updateField = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Projets"
        description="Gérez votre portfolio de projets"
        count={projects.length}
        icon={Folder}
        actionLabel="Nouveau projet"
        onAction={openCreate}
      />

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un projet..."
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={Folder}
            title="Aucun projet"
            description={searchTerm ? "Aucun projet ne correspond à votre recherche" : "Commencez par créer votre premier projet"}
            actionLabel="Créer un projet"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <DataCard
              key={project.id}
              index={index}
              onEdit={() => openEdit(project)}
              onDelete={() => handleDelete(project.id)}
              onView={project.projectUrl ? () => window.open(project.projectUrl, "_blank") : undefined}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Mis en avant</span>
                </div>
              )}

              <DataCardTitle>{project.title.fr}</DataCardTitle>
              <DataCardDescription>{project.description.fr}</DataCardDescription>

              {project.technologies.length > 0 && (
                <DataCardTags tags={project.technologies} />
              )}

              {/* Links */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </DataCard>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Modifier le projet" : "Nouveau projet"}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="space-y-5">
              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Titre (FR)" required>
                  <FormInput
                    value={formData.titleFr}
                    onChange={(v) => updateField("titleFr", v)}
                    placeholder="Mon super projet"
                    required
                  />
                </FormField>
                <FormField label="Title (EN)" required>
                  <FormInput
                    value={formData.titleEn}
                    onChange={(v) => updateField("titleEn", v)}
                    placeholder="My awesome project"
                    required
                  />
                </FormField>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Description (FR)" required>
                  <FormTextarea
                    value={formData.descriptionFr}
                    onChange={(v) => updateField("descriptionFr", v)}
                    placeholder="Description du projet..."
                    rows={3}
                    required
                  />
                </FormField>
                <FormField label="Description (EN)" required>
                  <FormTextarea
                    value={formData.descriptionEn}
                    onChange={(v) => updateField("descriptionEn", v)}
                    placeholder="Project description..."
                    rows={3}
                    required
                  />
                </FormField>
              </div>

              {/* Technologies */}
              <FormField label="Technologies" hint="Séparées par des virgules">
                <FormInput
                  value={formData.technologies}
                  onChange={(v) => updateField("technologies", v)}
                  placeholder="React, Node.js, TypeScript..."
                />
              </FormField>

              {/* URLs */}
              <div className="grid grid-cols-3 gap-4">
                <FormField label="Image URL">
                  <FormInput
                    value={formData.imageUrl}
                    onChange={(v) => updateField("imageUrl", v)}
                    placeholder="https://..."
                    type="url"
                  />
                </FormField>
                <FormField label="Demo URL">
                  <FormInput
                    value={formData.projectUrl}
                    onChange={(v) => updateField("projectUrl", v)}
                    placeholder="https://..."
                    type="url"
                  />
                </FormField>
                <FormField label="Repo URL">
                  <FormInput
                    value={formData.repoUrl}
                    onChange={(v) => updateField("repoUrl", v)}
                    placeholder="https://github.com/..."
                    type="url"
                  />
                </FormField>
              </div>

              {/* Featured */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => updateField("featured", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-gray-900 dark:peer-checked:bg-white transition-colors" />
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-900 rounded-full peer-checked:translate-x-4 transition-transform" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Mettre en avant ce projet
                </span>
              </label>
            </div>
          </ModalBody>

          <ModalFooter>
            <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createProject.isPending || updateProject.isPending}
            >
              {editingProject ? "Enregistrer" : "Créer"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
