"use client";

import { RiFileTextLine } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define interface for props
interface ArchiveItem {
  id: number;
  title: string;
  author: string;
  year: string;
  supervisor: string;
}

interface RecentArchivesListProps {
  archives: ArchiveItem[];
}

export default function RecentArchivesList({ archives }: RecentArchivesListProps) {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Recently Archived Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {archives.map((archive) => (
            <div 
              key={archive.id} 
              className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <RiFileTextLine className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{archive.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    By {archive.author} • {archive.year}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supervisor: {archive.supervisor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}