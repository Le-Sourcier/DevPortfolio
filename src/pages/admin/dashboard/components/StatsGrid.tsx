import { FileText, Folder, Code2, Briefcase, GraduationCap } from "lucide-react";
import { StatCard } from "./StatCard";
import { DashboardStats } from "../hooks/useDashboardData";

interface StatsGridProps {
  stats: DashboardStats;
}

const statsConfig = [
  { key: "posts", title: "Articles", icon: FileText, link: "/admin/posts" },
  { key: "projects", title: "Projets", icon: Folder, link: "/admin/projects" },
  { key: "skills", title: "Compétences", icon: Code2, link: "/admin/skills" },
  { key: "experiences", title: "Expériences", icon: Briefcase, link: "/admin/experiences" },
  { key: "education", title: "Formations", icon: GraduationCap, link: "/admin/education" },
] as const;

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statsConfig.map((config, index) => (
        <StatCard
          key={config.key}
          title={config.title}
          value={stats[config.key]}
          icon={config.icon}
          link={config.link}
          index={index}
        />
      ))}
    </div>
  );
}
