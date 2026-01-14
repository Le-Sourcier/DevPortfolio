import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming IEducation is defined in your types file
export interface IEducation {
  id: string;
  degree: { fr: string; en: string };
  institution: string;
  startDate: string;
  endDate?: string;
}

const EducationManagement: React.FC = () => {
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<IEducation | null>(null);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/education');
      setEducationList(data.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch education records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenModal = (education: IEducation | null = null) => {
    setCurrentEducation(education);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEducation(null);
  };

  const handleSave = async (educationData: Omit<IEducation, 'id'>) => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (currentEducation) {
        await axios.put(`/api/education/${currentEducation.id}`, educationData, config);
      } else {
        await axios.post('/api/education', educationData, config);
      }
      fetchEducation();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save education record.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`/api/education/${id}`, config);
        fetchEducation();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete education record.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Education</h1>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Education Record
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2">Degree (FR)</th>
              <th className="py-2">Institution</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationList.map(edu => (
              <tr key={edu.id}>
                <td className="border px-4 py-2">{edu.degree.fr}</td>
                <td className="border px-4 py-2">{edu.institution}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleOpenModal(edu)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(edu.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <EducationForm education={currentEducation} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

// Simplified Form Component for Education
const EducationForm: React.FC<{
  education: IEducation | null;
  onSave: (data: Omit<IEducation, 'id'>) => void;
  onClose: () => void;
}> = ({ education, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    degree: { fr: '', en: '' },
    institution: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree,
        institution: education.institution,
        startDate: new Date(education.startDate).toISOString().split('T')[0],
        endDate: education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : '',
      });
    }
  }, [education]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({ ...prev, [field]: { ...prev.degree, [lang]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">{education ? 'Edit' : 'Add'} Education Record</h2>
        <form onSubmit={handleSubmit}>
          <label>Degree (FR)</label>
          <input name="degree.fr" value={formData.degree.fr} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Degree (EN)</label>
          <input name="degree.en" value={formData.degree.en} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Institution</label>
          <input name="institution" value={formData.institution} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>End Date (Optional)</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationManagement;
