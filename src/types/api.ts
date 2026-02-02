export interface ApiResponse<T = any> {
  error: boolean;
  status: number;
  message: string;
  data?: T;
}

export type Locale = "fr" | "en";
export type Localized<T = string> = Record<Locale, T>;

export interface BlogPost {
  id: string;
  title: Localized<string>;
  slug: string;
  summary: Localized<string>;
  content: Localized<string>;
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  technologies: string[];
  imageUrl?: string;
  projectUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Experience {
  id: string;
  title: Localized<string>;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string | null;
  description: Localized<string>;
  technologies: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string | null;
}

export interface AuthResponse {
  token: string;
  user: { id: string; email: string; name?: string };
}
