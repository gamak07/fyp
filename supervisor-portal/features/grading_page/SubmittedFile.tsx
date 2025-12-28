import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiFileText, FiUpload } from "react-icons/fi";

const submittedFiles = [
  {
    name: "Chapter_1_Introduction.pdf",
    size: "2.4 MB",
    uploaded: "2 hours ago",
  },
  {
    name: "Literature_Review.pdf",
    size: "3.1 MB",
    uploaded: "2 hours ago",
  },
  {
    name: "References.pdf",
    size: "1.8 MB",
    uploaded: "2 hours ago",
  },
];

export default function SubmittedFile() {
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
          {submittedFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {file.size} • Uploaded {file.uploaded}
                  </p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap">
                View File
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
