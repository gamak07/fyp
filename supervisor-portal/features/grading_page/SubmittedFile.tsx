"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiFileText, FiUpload, FiDownload } from "react-icons/fi";

interface SubmittedFileProps {
  files: {
    name: string;
    url: string;
    uploaded: string;
    size: string;
  }[];
}

export default function SubmittedFile({ files }: SubmittedFileProps) {
  return (
    <Card className="border-gray-100 shadow-sm mb-6">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-3">
          <FiUpload className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg font-bold text-gray-800">
            Submitted Files
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 break-all">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.size} • Uploaded {file.uploaded}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => window.open(file.url, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                View File
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}