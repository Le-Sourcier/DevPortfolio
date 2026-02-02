// admin/Projects
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Folder,
  Plus,
  X,
  Loader2,
  Trash2,
  Edit2,
  ExternalLink,
  Github,
  Search,
} from "lucide-react";

import { useAuthStore } from "../../stores/auth";
import { useProjects, useCreateProject, useDeleteProject, useUpdateProject } from "../../api/projects";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Project } from "../../types/models";

const ProjectForm = ({
  project,
  onSave,
  onCancel,
  isSubmitting
}: {
  project?: Partial<Project> | null,
  onSave: (data: any) => void,
  onCancel: () => void,
  isSubmitting: boolean
}) => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: { fr: formData.titleFr, en: formData.titleEn },
      description: { fr: formData.descriptionFr, en: formData.descriptionEn },
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
      imageUrl: formData.imageUrl,
      projectUrl: formData.projectUrl,
      repoUrl: formData.repoUrl,
      featured: formData.featured
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Titre (FR)</label>
          <Input
             value={formData.titleFr}
             onChange={e => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
             required
             className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
           <label className="text-sm font-medium dark:text-gray-300">Title (EN)</label>
           <Input
              value={formData.titleEn}
              onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
              required
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
           />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Description (FR)</label>
          <textarea
             className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] dark:bg-gray-800 dark:text-white"
             value={formData.descriptionFr}
             onChange={e => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
             required
          />
        </div>
        <div>
           <label className="text-sm font-medium dark:text-gray-300">Description (EN)</label>
           <textarea
              className="w-full rounded-md border border-gray-200 dark:border-gray-700 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] dark:bg-gray-800 dark:text-white"
              value={formData.descriptionEn}
              onChange={e => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
              required
           />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium dark:text-gray-300">Technologies (séparées par des virgules)</label>
        <Input
           value={formData.technologies}
           onChange={e => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
           placeholder="React, Node.js, TypeScript"
           className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Image URL</label>
          <Input
             value={formData.imageUrl}
             onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
             className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Live URL</label>
          <Input
             value={formData.projectUrl}
             onChange={e => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
             className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-gray-300">Repo URL</label>
          <Input
             value={formData.repoUrl}
             onChange={e => setFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
             className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
          className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
        />
        <label htmlFor="featured" className="text-sm font-medium dark:text-gray-300">Mettre en avant ce projet</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        <Button type="submit" isLoading={isSubmitting}>Enregistrer</Button>
      </div>
    </form>
  )
}

export default function ProjectsManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projectsData, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("open") === "true") {
      setIsFormOpen(true);
    }
  }, [searchParams]);

  const handleSave = async (data: any) => {
    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject.id, ...data });
    } else {
      await createProject.mutateAsync(data);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      await deleteProject.mutateAsync(id);
    }
  };

  const projects = (projectsData?.data || []) as Project[];
  const filteredProjects = projects.filter(p =>
    p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.fr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projets</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez votre portfolio de projets.</p>
        </div>
        <Button onClick={() => { setEditingProject(null); setIsFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Nouveau Projet
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          placeholder="Rechercher..."
          className="flex-1 outline-none text-sm dark:bg-gray-800 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-blue-200 bg-blue-50/50 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="dark:text-white">{editingProject ? "Modifier le projet" : "Nouveau projet"}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsFormOpen(false)} className="dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"><X className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent>
                <ProjectForm
                  project={editingProject}
                  onSave={handleSave}
                  onCancel={() => setIsFormOpen(false)}
                  isSubmitting={createProject.isPending || updateProject.isPending}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-800">
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative overflow-hidden group">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title.fr} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><Folder size={32} /></div>
                  )}
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">Featured</div>
                  )}
                </div>
                <CardContent className="flex-1 p-4 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 dark:text-white">{project.title.fr}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 flex-1">{project.description.fr}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map(t => (
                      <span key={t} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">{t}</span>
                    ))}
                    {project.technologies.length > 3 && <span className="text-xs text-gray-400 px-1">+{project.technologies.length - 3}</span>}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex space-x-2">
                       {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"><ExternalLink size={16} /></a>}
                       {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-900 dark:hover:text-white"><Github size={16} /></a>}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditingProject(project); setIsFormOpen(true); }} className="dark:text-blue-400 dark:hover:bg-gray-800"><Edit2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)} className="dark:text-red-400 dark:hover:bg-gray-800"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
