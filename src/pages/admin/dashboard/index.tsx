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
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <WelcomeHeader
        totalContent={totalContent}
        completionPercent={completionPercent}
      />

      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentActivity activities={recentActivity} />
        </div>
        <div className="lg:col-span-2">
          <QuickActions />
        </div>
      </div>

      <ProfileCompletion
        items={completionItems}
        percent={completionPercent}
      />
    </div>
  );
}
