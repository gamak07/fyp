"use client";

import { useState, useActionState, useEffect } from "react";
import { RiUploadCloud2Line, RiFilePdfLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { saveArchive } from "@/lib/actions/archive"; 
import { toast } from "sonner";
import { CldUploadWidget } from 'next-cloudinary'; // Import Widget

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function ArchiveUploadForm() {
  const [state, formAction, isPending] = useActionState(saveArchive, initialState);
  
  // State for the uploaded result
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        // Reset Form
        setUploadedUrl("");
        setUploadedFileName(""); 
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  // Handler for Widget Success
  const handleUploadSuccess = (result: any) => {
    // Cloudinary returns the result info here
    setUploadedUrl(result.info.secure_url);
    setUploadedFileName(result.info.original_filename + "." + result.info.format);
    toast.success("Document attached successfully!");
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening widget
    setUploadedUrl("");
    setUploadedFileName("");
  };

  return (
    <Card className="shadow-sm border-gray-200 mb-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Upload Project to Archive</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          
          {/* Hidden Input needed for Server Action */}
          <input type="hidden" name="document_url" value={uploadedUrl} />

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">Project Title *</Label>
            <Input name="title" id="title" placeholder="Project Title" className={state.errors?.title ? "border-red-500" : ""} />
            {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-medium text-gray-700">Author *</Label>
            <Input name="author" id="author" placeholder="Student Name" className={state.errors?.author ? "border-red-500" : ""} />
            {state.errors?.author && <p className="text-red-500 text-sm">{state.errors.author}</p>}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Year *</Label>
              <Select name="year">
                <SelectTrigger className="py-6 border-gray-300"><SelectValue placeholder="Select Year" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => 2025 - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supervisor" className="text-sm font-medium text-gray-700">Supervisor *</Label>
              <Input name="supervisor" id="supervisor" placeholder="Supervisor Name" className={state.errors?.supervisor ? "border-red-500" : ""} />
            </div>
          </div>

          {/* CLOUDINARY WIDGET SECTION */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Project Document (PDF) <span className="text-red-500">*</span>
            </Label>
            
            {/* 1. We wrap our UI with the Widget Component */}
            <CldUploadWidget 
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={handleUploadSuccess}
              options={{
                sources: ['local', 'google_drive'],
                maxFiles: 1,
                resourceType: "raw", // Important for PDF/Docs
                clientAllowedFormats: ["pdf"], // Restrict to PDF
              }}
            >
              {({ open }) => {
                return (
                  <div 
                    onClick={() => !uploadedUrl && open()} // Only open if no file yet
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all group cursor-pointer
                      ${uploadedUrl 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                      }`}
                  >
                    <div>
                      {uploadedUrl ? (
                        <div className="flex flex-col items-center relative">
                          {/* Close Button to Remove File */}
                          <button 
                            type="button"
                            onClick={handleRemoveFile}
                            className="absolute -top-4 -right-4 p-1 bg-white rounded-full text-gray-400 hover:text-red-500 border shadow-sm"
                          >
                            <RiCloseLine className="w-5 h-5" />
                          </button>

                          <RiCheckLine className="w-12 h-12 text-green-500 mb-4" />
                          <p className="text-green-700 font-medium break-all max-w-sm">{uploadedFileName || "Document Uploaded"}</p>
                          <p className="text-xs text-green-600 mt-1">Ready to publish</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <RiUploadCloud2Line className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
                          <p className="text-gray-700 font-medium mb-1">
                            Click to upload PDF
                          </p>
                          <p className="text-sm text-gray-500">
                            Max size 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
            
            {state.errors?.document_url && <p className="text-red-500 text-sm">Document is required</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full py-6 h-auto text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70"
            >
              {isPending ? "Saving..." : "Publish to Archive"}
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  );
}