import { createContext, useContext, useState, ReactNode } from 'react';

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
    title: 'Portfolio Professionnel Full-Stack',
    description: 'Portfolio moderne avec React, TypeScript, Tailwind CSS et panneau d\'administration. Design responsive et animations fluides.',
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://david-portfolio.vercel.app',
    githubUrl: 'https://github.com/david/portfolio',
    featured: true
  },
  {
    id: '2',
    title: 'Application de Gestion Scolaire',
    description: 'Platforme complète pour la gestion des cours, étudiants et professeurs avec dashboards analytiques et système de notifications.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://school-manager.app',
    githubUrl: 'https://github.com/david/school-manager',
    featured: true
  },
  {
    id: '3',
    title: 'E-commerce Marketplace',
    description: 'Marketplace multi-vendeurs avec système de paiement intégré, gestion des stocks et interface admin complète.',
    image: 'https://images.pexels.com/photos/5591963/pexels-photo-5591963.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'Express', 'MongoDB', 'Stripe'],
    liveUrl: 'https://marketplace-demo.com',
    githubUrl: 'https://github.com/david/marketplace',
    featured: false
  },
  {
    id: '4',
    title: 'API de Réservation Hôtelière',
    description: 'REST API complète pour la gestion des réservations d\'hôtels avec authentification JWT et documentation Swagger.',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Node.js', 'Express', 'MySQL', 'JWT'],
    liveUrl: 'https://hotel-api-docs.com',
    githubUrl: 'https://github.com/david/hotel-booking-api',
    featured: false
  },
  {
    id: '5',
    title: 'Dashboard Analytics SaaS',
    description: 'Dashboard analytique en temps réel avec graphiques interactifs, exports CSV et système d\'abonnement.',
    image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'D3.js', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://analytics-saas.com',
    githubUrl: 'https://github.com/david/analytics-dashboard',
    featured: true
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