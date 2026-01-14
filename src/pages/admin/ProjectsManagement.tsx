import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProject } from '../../types'; // Assuming you have a types file

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/projects');
      setProjects(data.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project: IProject | null = null) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const handleSave = async (projectData: IProject) => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (currentProject) {
        await axios.put(`/api/projects/${currentProject.id}`, projectData, config);
      } else {
        await axios.post('/api/projects', projectData, config);
      }
      fetchProjects();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save project.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`/api/projects/${id}`, config);
        fetchProjects();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete project.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Project
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2">Title (FR)</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(proj => (
              <tr key={proj.id}>
                <td className="border px-4 py-2">{proj.title.fr}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleOpenModal(proj)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(proj.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <ProjectForm project={currentProject} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

// Simplified Form Component for Projects
const ProjectForm: React.FC<{
  project: IProject | null;
  onSave: (data: IProject) => void;
  onClose: () => void;
}> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<IProject>>({
    title: { fr: '', en: '' },
    description: { fr: '', en: '' },
    technologies: [],
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({ ...prev, [field]: { ...(prev[field] as any), [lang]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as IProject);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{project ? 'Edit' : 'Add'} Project</h2>
        <form onSubmit={handleSubmit}>
          <label>Title (FR)</label>
          <input name="title.fr" value={formData.title?.fr} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label>Title (EN)</label>
          <input name="title.en" value={formData.title?.en} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          {/* Add other fields like description, technologies, etc. */}
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectsManagement;
