"use client";

import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Calendar 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StudentProgressDetails() {
  const router = useRouter();

  // Mock Data (In a real app, you would fetch this using the studentId param)
  const student = {
    name: "John Tan Wei Ming",
    matricNo: "A12345678",
    projectTitle: "Machine Learning for Predictive Maintenance in Manufacturing",
    overallProgress: 40,
    milestones: [
      {
        title: "Proposal",
        status: "Completed",
        grade: "85",
        date: "Submitted: 15 Jan 2024",
        feedback: "Excellent research question and methodology. Well-structured proposal.",
        icon: CheckCircle2,
        color: "text-green-600",
        badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
      },
      {
        title: "Chapter 1: Introduction",
        status: "Completed",
        grade: "88",
        date: "Submitted: 10 Feb 2024",
        feedback: "Strong introduction with clear objectives. Good literature foundation.",
        icon: CheckCircle2,
        color: "text-green-600",
        badgeColor: "bg-green-100 text-green-700 hover:bg-green-100",
      },
      {
        title: "Chapter 2: Literature Review",
        status: "Awaiting Review",
        grade: null,
        date: "Submitted: 5 Mar 2024",
        feedback: null,
        icon: FileText,
        color: "text-blue-600",
        badgeColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
        action: "Review & Grade"
      },
      {
        title: "Chapter 3: Methodology",
        status: "In Progress",
        grade: null,
        date: "Due Date: 25 Mar 2024",
        feedback: null,
        icon: Clock,
        color: "text-yellow-600",
        badgeColor: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      },
      {
        title: "Chapter 4: Results",
        status: "Not Started",
        grade: null,
        date: "Due Date: 15 Apr 2024",
        feedback: null,
        icon: Calendar,
        color: "text-gray-400",
        badgeColor: "bg-gray-100 text-gray-600 hover:bg-gray-100",
      },
      {
        title: "Final Submission",
        status: "Not Started",
        grade: null,
        date: "Due Date: 30 Apr 2024",
        feedback: null,
        icon: Calendar,
        color: "text-gray-400",
        badgeColor: "bg-gray-100 text-gray-600 hover:bg-gray-100",
      },
    ]
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 mb-6 pl-0"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Students</span>
      </Button>

      {/* Student Profile Header */}
      <Card className="mb-8 border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{student.name}</h1>
              <p className="text-gray-600 mb-4">{student.matricNo}</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 inline-block w-full md:w-auto">
                <p className="text-sm text-gray-600 mb-1">Project Title:</p>
                <p className="text-gray-800 font-medium">{student.projectTitle}</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
              <p className="text-4xl font-bold text-blue-600">{student.overallProgress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Project Milestones</h2>
          
          <div className="space-y-6">
            {student.milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <milestone.icon className={cn("w-5 h-5", milestone.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h3>
                        <Badge variant="secondary" className={cn("px-3 py-1 text-sm font-medium rounded-full", milestone.badgeColor)}>
                          {milestone.status}
                        </Badge>
                      </div>
                      
                      {milestone.grade && (
                        <div className="text-left sm:text-right">
                          <p className="text-sm text-gray-600 mb-1">Grade</p>
                          <p className="text-2xl font-bold text-blue-600">{milestone.grade}</p>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{milestone.date}</p>

                    {/* Feedback Section */}
                    {milestone.feedback && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Supervisor Feedback:</p>
                        <p className="text-sm text-gray-600">{milestone.feedback}</p>
                      </div>
                    )}

                    {/* Action Button (e.g. for Review) */}
                    {milestone.action && (
                      <Button 
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        onClick={() => router.push('/supervisor/grading')} // Link to grading
                      >
                        {milestone.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}