import PairingManager from "@/features/pairing_page/PairingManager";
import { getSupervisorsWithStats, getUnassignedStudents } from "@/lib/actions/pairing";

// Server Component
export default async function PairingPage() {
  
  // 1. Fetch Data (Mock Database Call)
  const [studentsData, supervisorsData] = await Promise.all([
    getUnassignedStudents(),
    getSupervisorsWithStats()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header (Static Content) */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
        <h1 className="text-3xl font-bold">Pairing & Assignments</h1>
        <p className="mt-2 text-blue-100">Assign students to supervisors</p>
      </div>

      {/* Client Component Wrapper */}
      <PairingManager
        students={studentsData} 
        supervisors={supervisorsData} 
      />
      
    </div>
  );
}