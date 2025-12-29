import { getCurrentSupervisor } from "@/lib/auth-helpers";

export default async function Breadcrum() {
  const supervisor = await getCurrentSupervisor();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {supervisor.name}</h1>
        <p className="text-blue-100 text-lg">Here's what's happening with your students today</p>
      </div>
  )
}