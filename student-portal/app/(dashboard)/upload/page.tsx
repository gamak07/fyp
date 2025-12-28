"use client";
import { CloudUpload } from "lucide-react";
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

export default function ChapterUpload() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Chapter Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <Label>Select Chapter</Label>
            <Select>
              <SelectTrigger className="w-full py-6">
                <SelectValue placeholder="Select a chapter to upload" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ch1">Chapter 1</SelectItem>
                <SelectItem value="ch2">Chapter 2</SelectItem>
                <SelectItem value="ch3">Chapter 3</SelectItem>
                <SelectItem value="ch4">Chapter 4</SelectItem>
                <SelectItem value="ch5">Chapter 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Document</Label>
            <div className="border-2 border-dashed rounded-lg p-12 text-center transition-colors border-gray-300 hover:border-blue-500 bg-gray-50/50 hover:bg-blue-50/30 cursor-pointer">
              <CloudUpload className="mx-auto text-4xl text-gray-400 mb-4 w-12 h-12" />
              <p className="text-lg font-medium text-gray-600 mb-1">Drag and drop your file here</p>
              <p className="text-gray-500 mb-4 text-sm">or click to browse</p>
              <p className="text-xs text-gray-400">Supported: PDF, DOCX (Max: 10MB)</p>
              <input type="file" accept=".pdf,.docx" className="hidden" />
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            Upload Chapter
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}