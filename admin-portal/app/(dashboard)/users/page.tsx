import UserManager from "@/features/users_page/UserManager";
import { getStudents, getSupervisors } from "@/lib/actions/user";

// Server Component
export default async function UserManagementPage() {
  
  const [supervisors, students] = await Promise.all([
    getSupervisors(),
    getStudents()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Banner (Static content) */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="mt-2 text-blue-100">Manage supervisors and students accounts</p>
      </div>

      {/* Client Component handling the interactive Tabs and Search */}
      <UserManager 
        supervisors={supervisors} 
        students={students} 
      />
      
    </div>
  );
}