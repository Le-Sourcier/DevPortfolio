// Common Types
export type LocalizedString = {
  fr: string;
  en: string;
};

// Site Settings
export interface SiteSettings {
  id: string;
  siteName: string;
  emailContact: string;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  heroTitle: LocalizedString;
  heroSubtitle: LocalizedString;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  cvUrlFr?: string;
  cvUrlEn?: string;
  availableForWork: boolean;
  primaryColor: string;
  createdAt?: string;
  updatedAt?: string;
}

// User Interface
export interface User {
  id: string;
  username: string;
  // Password is not exposed to frontend
}

// Skill Interface
export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string; // FontAwesome or Lucide icon name
  level?: number; // 0-100
  createdAt?: string;
  updatedAt?: string;
}

// Education Interface
export interface Education {
  id: string;
  degree: LocalizedString;
  institution: string;
  startDate: string;
  endDate?: string | null;
  description?: LocalizedString | null;
  createdAt?: string;
  updatedAt?: string;
}

// Experience Interface
export interface Experience {
  id: string;
  title: LocalizedString;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  description: LocalizedString;
  technologies: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Project Interface
export interface Project {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  repoUrl?: string;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// BlogPost Categories
export type BlogCategory = 'tutorial' | 'news' | 'project' | 'thoughts';
export type BlogStatus = 'draft' | 'published';

export const BLOG_CATEGORIES: { value: BlogCategory; labelFr: string; labelEn: string }[] = [
  { value: 'tutorial', labelFr: 'Tutoriel', labelEn: 'Tutorial' },
  { value: 'news', labelFr: 'Actualité', labelEn: 'News' },
  { value: 'project', labelFr: 'Projet', labelEn: 'Project' },
  { value: 'thoughts', labelFr: 'Réflexion', labelEn: 'Thoughts' },
];

// BlogPost Interface
export interface BlogPost {
  id: string;
  title: LocalizedString;
  slug: string;
  category: BlogCategory;
  summary: LocalizedString;
  content: LocalizedString;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
  status: BlogStatus;
  createdAt?: string;
  updatedAt?: string;
}

// Comment Interface
export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface Comment {
  id: string;
  blogPostId: string;
  parentId: string | null;
  authorName: string;
  authorEmail: string;
  content: string;
  status: CommentStatus;
  createdAt?: string;
  updatedAt?: string;
  replies?: Comment[];
}

// Auth Response Interface
export interface AuthResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}
