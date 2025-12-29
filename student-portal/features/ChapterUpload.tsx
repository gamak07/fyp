"use client";

import { CloudUpload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadWidget } from "next-cloudinary";
import { useActionState, useState, useEffect } from "react";
import { saveChapter } from "@/lib/actions/chapter";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
};

export default function ChapterUpload() {
  const [state, formAction, isPending] = useActionState(saveChapter, initialState);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [fileName, setFileName] = useState("");

  // Feedback Toast
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        setUploadedUrl(""); // Reset form
        setFileName("");
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Chapter Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            
            {/* 1. Select Chapter */}
            <div className="space-y-2">
              <Label>Select Chapter</Label>
              <Select name="chapter" required>
                <SelectTrigger className="w-full py-6">
                  <SelectValue placeholder="Select a chapter to upload" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Chapter 1</SelectItem>
                  <SelectItem value="2">Chapter 2</SelectItem>
                  <SelectItem value="3">Chapter 3</SelectItem>
                  <SelectItem value="4">Chapter 4</SelectItem>
                  <SelectItem value="5">Chapter 5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 2. Cloudinary Widget */}
            <div className="space-y-2">
              <Label>Upload Document</Label>
              
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // <--- PUT YOUR PRESET NAME HERE
                options={{
                  sources: ['local', 'google_drive'],
                  maxFiles: 1,
                  clientAllowedFormats: ['pdf', 'docx', 'doc'], // Restrict file types
                  maxFileSize: 10000000, // 10MB
                }}
                onSuccess={(result: any) => {
                  setUploadedUrl(result.info.secure_url);
                  setFileName(result.info.original_filename);
                  toast.success("File uploaded successfully!");
                }}
              >
                {({ open }) => {
                  return (
                    <div 
                      onClick={() => open()} // clicking this opens the modal
                      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors 
                        ${uploadedUrl ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 bg-gray-50/50 hover:bg-blue-50/30'}
                        cursor-pointer`}
                    >
                      {uploadedUrl ? (
                        <div className="flex flex-col items-center animate-in fade-in zoom-in">
                          <CheckCircle className="mx-auto text-4xl text-green-500 mb-4 w-12 h-12" />
                          <p className="text-lg font-medium text-gray-800 mb-1">{fileName}</p>
                          <p className="text-green-600 text-sm">Document ready to submit</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <CloudUpload className="mx-auto text-4xl text-gray-400 mb-4 w-12 h-12" />
                          <p className="text-lg font-medium text-gray-600 mb-1">Click to Upload Document</p>
                          <p className="text-gray-500 mb-4 text-sm">PDF or DOCX (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  );
                }}
              </CldUploadWidget>
              
              {/* HIDDEN INPUT: This sends the URL to the Server Action */}
              <input type="hidden" name="fileUrl" value={uploadedUrl} />
            </div>

            {/* 3. Submit Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              size="lg"
              disabled={isPending || !uploadedUrl} // Disable if no file uploaded
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Submit Chapter"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}