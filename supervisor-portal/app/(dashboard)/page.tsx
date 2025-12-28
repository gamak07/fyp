import Breadcrum from "@/features/dashboard_page/Breadcrum";
import Stats from "@/features/dashboard_page/Stats";
import Activity from "@/features/dashboard_page/Activity";

export default function Dashboard() {
  
  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <Breadcrum />

      {/* Stats Grid */}

      <Stats />
      {/* Recent Activity Card */}
      <Activity />
    </div>
  );
}
