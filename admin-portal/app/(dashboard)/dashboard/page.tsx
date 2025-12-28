import DashboardStats from "@/features/dashboard_page/DashboardStats";
import DashboardQuickActions from "@/features/dashboard_page/DashboardQuickActions";
import DashboardActivity from "@/features/dashboard_page/DashboardActivity";
import { getDashboardStats, getRecentActivity } from "@/lib/actions/dashboard";

// This is a Server Component by default in Next.js App Router
export default async function AdminDashboardPage() {
 const [statsData, activityData] = await Promise.all([
    getDashboardStats(),
    getRecentActivity()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
        <h1 className="text-3xl font-bold">System Overview</h1>
        <p className="mt-2 text-blue-100">Monitor and manage your FYP system</p>
      </div>

      <div className="p-8">
        
        {/* Component 1: Stats Grid */}
        <DashboardStats data={statsData} />

        {/* Component 2: Quick Actions */}
        <DashboardQuickActions />

        {/* Component 3: Recent Activity */}
        <DashboardActivity activities={activityData} />

      </div>
    </div>
  );
}