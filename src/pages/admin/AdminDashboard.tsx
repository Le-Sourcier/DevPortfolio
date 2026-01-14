import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Stat {
  count: number;
  label: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Example: Fetching counts for different data types
        // Replace with your actual API endpoints
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [experiences, projects, skills, blogPosts] = await Promise.all([
          axios.get('/api/experiences', config),
          axios.get('/api/projects', config),
          axios.get('/api/skills', config),
          axios.get('/api/blogposts', config),
        ]);

        setStats([
          { count: experiences.data.data.length, label: 'Experiences' },
          { count: projects.data.data.length, label: 'Projects' },
          { count: skills.data.data.length, label: 'Skills' },
          { count: blogPosts.data.data.length, label: 'Blog Posts' },
        ]);
      } catch (err: any) {
        setError('Failed to fetch stats. ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{stat.count}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
      {/* Further dashboard components can be added here */}
    </div>
  );
};

export default AdminDashboard;
