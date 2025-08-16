import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface AppState {
  blogPosts: BlogPost[];
  projects: Project[];
  isAdmin: boolean;
}

interface AppContextType extends AppState {
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  toggleAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn how to structure large-scale React applications using TypeScript for better maintainability and developer experience.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    slug: 'building-scalable-react-applications-typescript',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'React',
    tags: ['React', 'TypeScript', 'Architecture'],
    publishedAt: '2024-01-15',
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Better UI Design',
    excerpt: 'Discover advanced CSS techniques including Grid, Flexbox, and custom properties for creating stunning user interfaces.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    slug: 'modern-css-techniques-ui-design',
    image: 'https://images.pexels.com/photos/6636288/pexels-photo-6636288.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'CSS',
    tags: ['CSS', 'Design', 'Frontend'],
    publishedAt: '2024-01-10',
    readTime: 6,
    featured: false
  },
  {
    id: '3',
    title: 'API Design Best Practices with Node.js',
    excerpt: 'Comprehensive guide to designing robust and scalable APIs using Node.js, Express, and modern development patterns.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    slug: 'api-design-best-practices-nodejs',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'Backend',
    tags: ['Node.js', 'API', 'Backend'],
    publishedAt: '2024-01-05',
    readTime: 10,
    featured: true
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL featuring real-time inventory management.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, team collaboration, and advanced analytics.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'Firebase', 'Material-UI'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with interactive maps, forecasts, and location-based recommendations.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAdmin, setIsAdmin] = useState(false);

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updatedProject } : project
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const toggleAdmin = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      blogPosts,
      projects,
      isAdmin,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addProject,
      updateProject,
      deleteProject,
      toggleAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}