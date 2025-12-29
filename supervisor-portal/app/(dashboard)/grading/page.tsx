import { notFound, redirect } from "next/navigation";
import Breadcrum from "@/features/grading_page/Breadcrum";
import StudentInformation from "@/features/grading_page/StudentInformation";
import SubmittedFile from "@/features/grading_page/SubmittedFile";
import Feedback from "@/features/grading_page/Feedback";
import { getSubmissionDetails } from "@/lib/actions/grading";

interface GradingPageProps {
  searchParams: Promise<{
    type?: string;
    itemId?: string;
    // studentId is now optional/ignored
  }>;
}

export default async function GradingPage({ searchParams }: GradingPageProps) {
  const { type, itemId } = await searchParams;

  // 1. Only require type and itemId
  if (!type || !itemId) {
    redirect("/students");
  }

  // 2. Fetch Data (Function now finds the student automatically)
  const data = await getSubmissionDetails(type, itemId);

  if (!data) {
    return notFound();
  }

  const { student, submissionData, fileData } = data;

  return (
    <div className="p-8">
      <Breadcrum />

      {/* Student Details (Fetched via the Item) */}
      <StudentInformation 
        name={student.name}
        matricNo={student.matric_no}
        projectTitle={student.project_title || "Topic Not Set"}
        submissionType={submissionData.title}
      />

      {/* File or Text Display */}
      {fileData.length > 0 ? (
        <SubmittedFile files={fileData} />
      ) : (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Proposal Description</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {submissionData.description || "No description provided."}
            </p>
          </div>
        </div>
      )}

      {/* Grading Form */}
      <Feedback 
        studentId={student.id} // Pass the ID we found to the form
        itemId={itemId}
        existingGrade={submissionData.grade}
        existingFeedback={submissionData.feedback}
      />
    </div>
  );
}