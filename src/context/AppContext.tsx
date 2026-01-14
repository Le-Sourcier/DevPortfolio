import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { IBlogPost, IProject, ISkill } from '../types';

interface AppState {
  blogPosts: IBlogPost[];
  projects: IProject[];
  skills: ISkill[];
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    blogPosts: [],
    projects: [],
    skills: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true, error: null }));

        const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

        const [projectsRes, blogPostsRes, skillsRes] = await Promise.all([
          axios.get(`${API_URL}/api/projects`),
          axios.get(`${API_URL}/api/blogposts`),
          axios.get(`${API_URL}/api/skills`)
        ]);

        setState({
          projects: projectsRes.data,
          blogPosts: blogPostsRes.data,
          skills: skillsRes.data,
          loading: false,
          error: null,
        });
      } catch (err) {
        let errorMessage = "An unknown error occurred";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: errorMessage,
        }));
        console.error("Failed to fetch data:", errorMessage);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={state}>
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