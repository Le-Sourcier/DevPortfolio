import { useDashboardData } from "./hooks";
import {
  WelcomeHeader,
  StatsGrid,
  RecentActivity,
  QuickActions,
  ProfileCompletion,
  LoadingState,
} from "./components";

export default function AdminDashboard() {
  const {
    isLoading,
    stats,
    completionItems,
    completionPercent,
    recentActivity,
  } = useDashboardData();

  if (isLoading) {
    return <LoadingState />;
  }

  const totalContent = stats.posts + stats.projects;

  return (
    <div className="space-y-6 pb-8">
      <WelcomeHeader
        totalContent={totalContent}
        completionPercent={completionPercent}
      />

      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivity} />
        <QuickActions />
      </div>

      <ProfileCompletion
        items={completionItems}
        percent={completionPercent}
      />
    </div>
  );
}
