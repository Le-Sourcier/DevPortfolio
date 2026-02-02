import { useBlogPosts } from "../../../../api/blogposts";
import { useProjects } from "../../../../api/projects";
import { useSkills } from "../../../../api/skills";
import { useExperiences } from "../../../../api/experiences";
import { useEducation } from "../../../../api/education";

export interface DashboardStats {
  posts: number;
  projects: number;
  skills: number;
  experiences: number;
  education: number;
}

export interface CompletionItem {
  key: string;
  label: string;
  count: number;
  min: number;
  link: string;
}

export interface RecentActivityItem {
  id: string;
  type: "post" | "project" | "experience";
  title: string;
  date: string;
  link: string;
}

export function useDashboardData() {
  const { data: postsData, isLoading: postsLoading } = useBlogPosts();
  const { data: projectsData, isLoading: projectsLoading } = useProjects();
  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { data: experiencesData, isLoading: experiencesLoading } = useExperiences();
  const { data: educationData, isLoading: educationLoading } = useEducation();

  const isLoading = postsLoading || projectsLoading || skillsLoading || experiencesLoading || educationLoading;

  const posts = postsData?.data || [];
  const projects = projectsData?.data || [];
  const skills = skillsData?.data || [];
  const experiences = experiencesData?.data || [];
  const education = educationData?.data || [];

  const stats: DashboardStats = {
    posts: posts.length,
    projects: projects.length,
    skills: skills.length,
    experiences: experiences.length,
    education: education.length,
  };

  const completionItems: CompletionItem[] = [
    { key: "posts", label: "Articles", count: posts.length, min: 3, link: "/admin/posts" },
    { key: "projects", label: "Projets", count: projects.length, min: 3, link: "/admin/projects" },
    { key: "skills", label: "Compétences", count: skills.length, min: 5, link: "/admin/skills" },
    { key: "experiences", label: "Expériences", count: experiences.length, min: 2, link: "/admin/experiences" },
    { key: "education", label: "Formations", count: education.length, min: 1, link: "/admin/education" },
  ];

  const completedCount = completionItems.filter(item => item.count >= item.min).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);

  const recentActivity: RecentActivityItem[] = [
    ...posts.slice(0, 2).map((post: any) => ({
      id: post.id,
      type: "post" as const,
      title: post.title?.fr || post.title,
      date: new Date(post.createdAt).toLocaleDateString("fr-FR"),
      link: "/admin/posts",
    })),
    ...projects.slice(0, 2).map((project: any) => ({
      id: project.id,
      type: "project" as const,
      title: project.title?.fr || project.title,
      date: new Date(project.createdAt).toLocaleDateString("fr-FR"),
      link: "/admin/projects",
    })),
    ...experiences.slice(0, 1).map((exp: any) => ({
      id: exp.id,
      type: "experience" as const,
      title: `${exp.title?.fr} - ${exp.company}`,
      date: new Date(exp.startDate).toLocaleDateString("fr-FR"),
      link: "/admin/experiences",
    })),
  ].slice(0, 5);

  return {
    isLoading,
    stats,
    completionItems,
    completionPercent,
    recentActivity,
  };
}
