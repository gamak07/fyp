
import Breadcrum from "@/features/archive_page/Breadcrum";
import ArchiveUploadForm from "@/features/archive_page/ArchiveUploadForm";
import RecentArchivesList from "@/features/archive_page/RecentArchiveList";
import { getArchives } from "@/lib/actions/archive";

export default async function ArchiveManager() {
  
  const recentArchives = await getArchives();

  // 2. Map DB columns to Component Props
  const formattedArchives = recentArchives.map((item: any) => ({
    id: item.id,
    title: item.title,
    author: item.student_name,
    year: item.year,
    supervisor: item.supervisor_name,
    url: item.document_url // Pass the URL if you want to link to it later
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Banner */}
      <Breadcrum />

      <div className="p-8 max-w-4xl mx-auto">
        
        {/* Component 1: Form */}
        <ArchiveUploadForm />

        {/* Component 2: List */}
        <RecentArchivesList archives={formattedArchives} />

      </div>
    </div>
  );
}