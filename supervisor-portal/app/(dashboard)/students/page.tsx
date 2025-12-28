
import Breadcrum from "@/features/student_page/Breadcrum";
import Toolbar from "@/features/student_page/Toolbar";
import StudentGrid from "@/features/student_page/StudentGrid";

export default function Students() {
  // Mock Data extracted from your HTML

  return (
    <div className="p-8">
      {/* Header */}
      <Breadcrum />

      {/* Search Bar */}
      <Toolbar />

      {/* Grid */}
      <StudentGrid />
    </div>
  );
}
