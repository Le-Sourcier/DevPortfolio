import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming IBlogPost is defined in your types file
export interface IBlogPost {
  id: string;
  title: { fr: string; en: string };
  slug: string;
  summary: { fr: string; en: string };
  content: { fr: string; en: string };
  // Add other fields as necessary
}

const BlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<IBlogPost | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/blogposts');
      setPosts(data.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenModal = (post: IBlogPost | null = null) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  const handleSave = async (postData: Omit<IBlogPost, 'id'>) => {
    const token = localStorage.getItem('authToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (currentPost) {
        await axios.put(`/api/blogposts/${currentPost.id}`, postData, config);
      } else {
        await axios.post('/api/blogposts', postData, config);
      }
      fetchPosts();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save blog post.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        await axios.delete(`/api/blogposts/${id}`, config);
        fetchPosts();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete blog post.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Blog Posts</h1>
      <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Add New Post
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-2">Title (FR)</th>
              <th className="py-2">Slug</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className="border px-4 py-2">{post.title.fr}</td>
                <td className="border px-4 py-2">{post.slug}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleOpenModal(post)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <BlogPostForm post={currentPost} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

// Simplified Form Component for Blog Posts
const BlogPostForm: React.FC<{
  post: IBlogPost | null;
  onSave: (data: Omit<IBlogPost, 'id'>) => void;
  onClose: () => void;
}> = ({ post, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: { fr: '', en: '' },
    slug: '',
    summary: { fr: '', en: '' },
    content: { fr: '', en: '' },
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

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
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg w-3/4 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{post ? 'Edit' : 'Add'} Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <label>Title (FR)</label>
          <input name="title.fr" value={formData.title.fr} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Title (EN)</label>
          <input name="title.en" value={formData.title.en} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Slug</label>
          <input name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <label>Summary (FR)</label>
          <textarea name="summary.fr" value={formData.summary.fr} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label>Summary (EN)</label>
          <textarea name="summary.en" value={formData.summary.en} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
          <label>Content (FR)</label>
          <textarea name="content.fr" value={formData.content.fr} onChange={handleChange} rows={10} className="w-full p-2 border rounded mb-2" />
          <label>Content (EN)</label>
          <textarea name="content.en" value={formData.content.en} onChange={handleChange} rows={10} className="w-full p-2 border rounded mb-2" />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogManagement;
