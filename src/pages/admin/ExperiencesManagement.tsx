import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IExperience } from '../../types'; // Assuming you have a types file

const ExperiencesManagement: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // State for form modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<IExperience | null>(null);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/experiences');
      setExperiences(data.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch experiences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenModal = (experience: IExperience | null = null) => {
    setCurrentExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentExperience(null);
  };

  const handleSave = async (experienceData: IExperience) => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (currentExperience) {
        // Update
        await axios.put(`/api/experiences/${currentExperience.id}`, experienceData, config);
      } else {
        // Create
        await axios.post('/api/experiences', experienceData, config);
      }
      fetchExperiences(); // Refresh list
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save experience.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`/api/experiences/${id}`, config);
        fetchExperiences(); // Refresh list
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete experience.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Experiences</h1>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Experience
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2">Title (FR)</th>
              <th className="py-2">Company</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map(exp => (
              <tr key={exp.id}>
                <td className="border px-4 py-2">{exp.title.fr}</td>
                <td className="border px-4 py-2">{exp.company}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleOpenModal(exp)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(exp.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <ExperienceForm experience={currentExperience} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

// Form Component (simplified)
const ExperienceForm: React.FC<{
  experience: IExperience | null;
  onSave: (data: IExperience) => void;
  onClose: () => void;
}> = ({ experience, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: { fr: '', en: '' },
    company: '',
    // ... other fields
  });

  useEffect(() => {
    if (experience) {
      setFormData(experience);
    }
  }, [experience]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({ ...prev, [field]: { ...prev[field], [lang]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as IExperience);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{experience ? 'Edit' : 'Add'} Experience</h2>
        <form onSubmit={handleSubmit}>
          {/* Example for a bilingual field */}
          <label>Title (FR)</label>
          <input name="title.fr" value={formData.title.fr} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label>Title (EN)</label>
          <input name="title.en" value={formData.title.en} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label>Company</label>
          <input name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          {/* ... other form fields */}
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperiencesManagement;
