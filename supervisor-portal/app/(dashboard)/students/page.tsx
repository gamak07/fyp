
import Breadcrum from "@/features/student_page/Breadcrum";
import Toolbar from "@/features/student_page/Toolbar";
import StudentGrid from "@/features/student_page/StudentGrid";
import { getMyStudents } from "@/lib/actions/students";

export default async function Students() {
  // Mock Data extracted from your HTML

  const studentsData = await getMyStudents();
  console.log(studentsData)
  return (
    <div className="p-8">
      {/* Header */}
      <Breadcrum />

      {/* Search Bar */}
      <Toolbar />

      {/* Grid */}
      <StudentGrid students={studentsData} />
    </div>
  );
}
