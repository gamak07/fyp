import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { FiFileText } from "react-icons/fi";

interface StudentInfoProps {
  name: string;
  matricNo: string;
  submissionType: string;
  projectTitle: string;
}

export default function StudentInformation({ name, matricNo, submissionType, projectTitle }: StudentInfoProps) {
  return (
    <Card className="border-gray-100 shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FiFileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">
              {matricNo} • {submissionType}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 mb-1">Project Title:</p>
          <p className="text-gray-800 font-medium">{projectTitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}