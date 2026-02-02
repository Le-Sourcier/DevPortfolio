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

// BlogPost Interface
export interface BlogPost {
  id: string;
  title: LocalizedString;
  slug: string;
  summary: LocalizedString;
  content: LocalizedString;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth Response Interface
export interface AuthResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
}
