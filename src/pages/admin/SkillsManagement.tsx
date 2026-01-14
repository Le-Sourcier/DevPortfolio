import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming ISkill is defined in your types file
export interface ISkill {
  id: string;
  name: string;
  category: string;
}

const SkillsManagement: React.FC = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<ISkill | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/skills');
      setSkills(data.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenModal = (skill: ISkill | null = null) => {
    setCurrentSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSkill(null);
  };

  const handleSave = async (skillData: Omit<ISkill, 'id'>) => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (currentSkill) {
        await axios.put(`/api/skills/${currentSkill.id}`, skillData, config);
      } else {
        await axios.post('/api/skills', skillData, config);
      }
      fetchSkills();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save skill.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`/api/skills/${id}`, config);
        fetchSkills();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete skill.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Skills</h1>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Skill
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill.id}>
                <td className="border px-4 py-2">{skill.name}</td>
                <td className="border px-4 py-2">{skill.category}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleOpenModal(skill)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(skill.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <SkillForm skill={currentSkill} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

// Simplified Form Component for Skills
const SkillForm: React.FC<{
  skill: ISkill | null;
  onSave: (data: Omit<ISkill, 'id'>) => void;
  onClose: () => void;
}> = ({ skill, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });

  useEffect(() => {
    if (skill) {
      setFormData({ name: skill.name, category: skill.category });
    }
  }, [skill]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{skill ? 'Edit' : 'Add'} Skill</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Category</label>
          <input name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillsManagement;
