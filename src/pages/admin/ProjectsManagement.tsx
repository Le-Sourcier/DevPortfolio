// admin/Projects

import { motion } from "framer-motion";
import {
  Folder,
  Plus,
  X,
  Save,
  Star,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  Code,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../stores/auth";
import {
  useProjects,
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from "../../api/projects";
import { useSearchParams } from "react-router-dom";
import React from "react";

function ProjectsManagemenet() {
  const token = useAuthStore((s) => s.token);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const { data: apiProjects, isLoading, error } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const updateProject = useUpdateProject();

  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    const isProjectsTab = searchParams.get("tab") === "projects";
    const isOpen = searchParams.get("open") === "true";

    if (isProjectsTab && isOpen) {
      setShowNewProjectForm(true);
    }
  }, [searchParams]);

  const [newProject, setNewProject] = useState({
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    image: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // authentication is handled globally in AdminLayout
  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const handleAddProject = () => {
    if (!token) {
      alert(
        "Vous devez être connecté pour effectuer cette action (401 Unauthorized)."
      );
      return;
    }
    if (
      newProject.titleFr &&
      newProject.titleEn &&
      newProject.descriptionFr &&
      newProject.descriptionEn
    ) {
      const payload = {
        title: { fr: newProject.titleFr, en: newProject.titleEn },
        description: {
          fr: newProject.descriptionFr,
          en: newProject.descriptionEn,
        },
        technologies: newProject.technologies
          ? newProject.technologies.split(",").map((t) => t.trim())
          : [],
        imageUrl: newProject.image || undefined,
        projectUrl: newProject.liveUrl || undefined,
        repoUrl: newProject.githubUrl || undefined,
        featured: newProject.featured,
      } as const;
      if (isEditMode && editingId) {
        updateProject.mutate(
          { id: editingId, ...(payload as any) },
          {
            onSuccess: () => {
              setShowNewProjectForm(false);
              setIsEditMode(false);
              setEditingId(null);
            },
            onError: (err: any) => {
              if (err?.response?.status === 401) {
                alert(
                  "Session expirée ou non authentifié. Veuillez vous reconnecter."
                );
              }
            },
          }
        );
      } else {
        createProject.mutate(payload as any, {
          onSuccess: () => {
            setNewProject({
              titleFr: "",
              titleEn: "",
              descriptionFr: "",
              descriptionEn: "",
              image: "",
              technologies: "",
              liveUrl: "",
              githubUrl: "",
              featured: false,
            });
            setShowNewProjectForm(false);
          },
          onError: (err: any) => {
            if (err?.response?.status === 401) {
              alert(
                "Session expirée ou non authentifié. Veuillez vous reconnecter."
              );
            }
          },
        });
      }
    }
  };

  const projects = (apiProjects || []).map((p) => ({
    id: p.id,
    title: p.title?.fr ?? "Projet",
    description: p.description?.fr ?? "",
    image: p.imageUrl ?? "",
    technologies: p.technologies ?? [],
    liveUrl: p.projectUrl,
    githubUrl: p.repoUrl,
    featured: (p as any)?.featured ?? false,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Folder className="w-8 h-8 mr-3 text-purple-600" />
              Gestion des Projets
            </h2>
            <p className="text-gray-600 mt-2">Présentez vos réalisations</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEditMode(false);
              setEditingId(null);
              setNewProject({
                titleFr: "",
                titleEn: "",
                descriptionFr: "",
                descriptionEn: "",
                image: "",
                technologies: "",
                liveUrl: "",
                githubUrl: "",
                featured: false,
              });
              setShowNewProjectForm(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau projet
          </motion.button>
        </div>

        {/* New Project Form */}
        {showNewProjectForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-purple-200 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Modifier le projet" : "Créer un nouveau projet"}
              </h3>
              <button
                onClick={() => {
                  setShowNewProjectForm(false);
                  setIsEditMode(false);
                  setEditingId(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du projet (FR)
                  </label>
                  <input
                    type="text"
                    placeholder="Mon Super Projet"
                    value={newProject.titleFr}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        titleFr: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project name (EN)
                  </label>
                  <input
                    type="text"
                    placeholder="My Awesome Project"
                    value={newProject.titleEn}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        titleEn: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Technologies
                  </label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    value={newProject.technologies}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        technologies: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL du projet
                  </label>
                  <input
                    type="url"
                    placeholder="https://monprojet.com"
                    value={newProject.liveUrl}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        liveUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL GitHub
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/user/repo"
                    value={newProject.githubUrl}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        githubUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image de couverture
              </label>
              <input
                type="url"
                placeholder="https://example.com/project-image.jpg"
                value={newProject.image}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    image: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
              />
            </div>

            <div className="mb-6 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (FR)
                </label>
                <textarea
                  placeholder="Description détaillée du projet..."
                  value={newProject.descriptionFr}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      descriptionFr: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 bg-white/70"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (EN)
                </label>
                <textarea
                  placeholder="Detailed project description..."
                  value={newProject.descriptionEn}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      descriptionEn: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus-border-transparent outline-none transition-all duration-200 bg-white/70"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newProject.featured}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      featured: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Projet vedette
                </span>
              </label>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowNewProjectForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  Annuler
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddProject}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  {isEditMode
                    ? "Enregistrer les modifications"
                    : "Créer le projet"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {isLoading && (
          <div className="py-4 text-center">Chargement des projets...</div>
        )}
        {error && (
          <div className="py-4 text-center text-red-600">
            Erreur lors du chargement des projets.
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 mr-1" />
                      Vedette
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const url = project.liveUrl || project.githubUrl;
                        if (url)
                          window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200">
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        const original = Array.isArray(apiProjects)
                          ? apiProjects.find((p) => p.id === project.id)
                          : undefined;
                        setIsEditMode(true);
                        setEditingId(project.id);
                        setShowNewProjectForm(true);
                        setNewProject({
                          titleFr: original?.title?.fr ?? project.title,
                          titleEn: original?.title?.en ?? project.title,
                          descriptionFr:
                            original?.description?.fr ?? project.description,
                          descriptionEn:
                            original?.description?.en ?? project.description,
                          image: original?.imageUrl ?? project.image,
                          technologies: (
                            original?.technologies ||
                            project.technologies ||
                            []
                          ).join(", "),
                          liveUrl:
                            original?.projectUrl ?? project.liveUrl ?? "",
                          githubUrl:
                            original?.repoUrl ?? project.githubUrl ?? "",
                          featured: project.featured,
                        });
                      }}
                      className="p-1 text-green-600 hover:bg-green-100 rounded-lg transition-all duration-200">
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setConfirmDelete({
                          id: project.id,
                          title: project.title,
                        })
                      }
                      className="p-1 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="relative flex items-center justify-between">
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                        title="Voir le projet">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        title="Code source">
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuOpenId((prev) =>
                          prev === project.id ? null : project.id
                        )
                      }
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {menuOpenId === project.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-10">
                        <button
                          onClick={() => {
                            const url = project.liveUrl || project.githubUrl;
                            if (url)
                              window.open(url, "_blank", "noopener,noreferrer");
                            setMenuOpenId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                          Aperçu
                        </button>
                        <button
                          onClick={() => {
                            const original = Array.isArray(apiProjects)
                              ? apiProjects.find((p) => p.id === project.id)
                              : undefined;
                            setIsEditMode(true);
                            setEditingId(project.id);
                            setShowNewProjectForm(true);
                            setNewProject({
                              titleFr: original?.title?.fr ?? project.title,
                              titleEn: original?.title?.en ?? project.title,
                              descriptionFr:
                                original?.description?.fr ??
                                project.description,
                              descriptionEn:
                                original?.description?.en ??
                                project.description,
                              image: original?.imageUrl ?? project.image,
                              technologies: (
                                original?.technologies ||
                                project.technologies ||
                                []
                              ).join(", "),
                              liveUrl:
                                original?.projectUrl ?? project.liveUrl ?? "",
                              githubUrl:
                                original?.repoUrl ?? project.githubUrl ?? "",
                              featured:
                                (original as any)?.featured ?? project.featured,
                            });
                            setMenuOpenId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                          Éditer
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDelete({
                              id: project.id,
                              title: project.title,
                            });
                            setMenuOpenId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* inline edit removed: unified with main form */}
              </div>
            </motion.div>
          ))}
        </div>
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setConfirmDelete(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md p-6 mx-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirmer la suppression
              </h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer le projet
                <span className="font-medium"> "{confirmDelete.title}"</span> ?
                Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Annuler
                </button>
                <button
                  onClick={() => {
                    deleteProject.mutate(confirmDelete.id);
                    setConfirmDelete(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectsManagemenet;
