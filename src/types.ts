export interface IExperience {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  company: string;
  location?: string;
  startDate: string; // Using string for simplicity, can be Date
  endDate?: string;
  description: {
    fr: string;
    en: string;
  };
  technologies: string[];
}

export interface IProject {
    id: string;
    title: {
        fr: string;
        en: string;
    };
    description: {
        fr: string;
        en: string;
    };
    technologies: string[];
    imageUrl?: string;
    projectUrl?: string;
    repoUrl?: string;
}

export interface ISkill {
  id: string;
  name: string;
  category: string;
}

export interface IEducation {
  id: string;
  degree: {
    fr: string;
    en: string;
  };
  institution: string;
  startDate: string;
  endDate?: string;
}

export interface IBlogPost {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  slug: string;
  summary: {
    fr: string;
    en: string;
  };
  content: {
    fr: string;
    en: string;
  };
  author: string;
  publishedAt: string;
  tags: string[];
  imageUrl?: string;
}
