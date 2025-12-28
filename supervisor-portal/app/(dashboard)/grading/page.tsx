import Breadcrum from "@/features/grading_page/Breadcrum";
import StudentInformation from "@/features/grading_page/StudentInformation";
import SubmittedFile from "@/features/grading_page/SubmittedFile";
import Feedback from "@/features/grading_page/Feedback";

export default function GradingPage() {
 

  return (
    <div className="p-8">
      <Breadcrum />

      <StudentInformation />

      <SubmittedFile />

      <Feedback />
    </div>
  );
}
