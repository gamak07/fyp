import Breadcrum from "@/features/dashboard_page/Breadcrum";
import Stats from "@/features/dashboard_page/Stats";
import Activity from "@/features/dashboard_page/Activity";
import { getDashboardStats } from "@/lib/actions/dashboard";

export default async function Dashboard() {
  const { stats, activities } = await getDashboardStats();

  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <Breadcrum />

      {/* Stats Grid */}
      <Stats stats={stats} />

      {/* Recent Activity Card */}
      <Activity activities={activities} />
    </div>
  );
}