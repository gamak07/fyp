import { notFound } from "next/navigation";
import { getStudentFullProfile, type MilestoneItem } from "@/lib/actions/student-details";
import { ArrowLeft, CheckCircle2, FileText, Clock, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link"; 

// Icon Map helper
const IconMap = {
  check: CheckCircle2,
  file: FileText,
  clock: Clock,
  calendar: Calendar,
  alert: AlertCircle
};

// FIX 1: Update the Type to be a Promise
interface PageProps {
  params: Promise<{ studentId: string }>;
}

export default async function StudentProgressDetails({ params }: PageProps) {
  // FIX 2: Await the params before accessing studentId
  const { studentId } = await params;

  const data = await getStudentFullProfile(studentId);
  
  if (!data) return notFound();

  const { student, projectTitle, milestones } = data;

  // Calculate Progress Logic
  const totalItems = 6; 
  const completedItems = milestones.filter(m => m.status === 'Completed' || m.status === 'Approved').length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link href="/students" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 mb-6 px-3 py-2 rounded-lg transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Students</span>
      </Link>

      {/* Student Profile Header */}
      <Card className="mb-8 border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{student.name}</h1>
              <p className="text-gray-600 mb-4">{student.matric_no}</p>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 inline-block w-full md:w-auto">
                <p className="text-sm text-gray-600 mb-1">Project Title:</p>
                <p className="text-gray-800 font-medium">{projectTitle}</p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
              <p className="text-4xl font-bold text-blue-600">{progressPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones List */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Project Milestones</h2>
          
          <div className="space-y-6">
            {milestones.map((milestone) => {
              const IconComponent = IconMap[milestone.iconName];

              return (
                <div 
                  key={milestone.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className={cn("w-5 h-5", milestone.color)} />
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
                        
                        {/* Grade Display */}
                        {milestone.grade !== null && (
                          <div className="text-left sm:text-right">
                            <p className="text-sm text-gray-600 mb-1">Grade</p>
                            <p className="text-2xl font-bold text-blue-600">{milestone.grade}</p>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{milestone.date}</p>

                      {/* Feedback Display */}
                      {milestone.feedback && (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">Feedback:</p>
                          <p className="text-sm text-gray-600 italic">"{milestone.feedback}"</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {milestone.action && (
                        <div className="flex gap-3 mt-4">
                          {milestone.fileUrl && (
                            <Button variant="outline" asChild>
                              <a href={milestone.fileUrl} target="_blank" rel="noopener noreferrer">
                                View Document
                              </a>
                            </Button>
                          )}
                          
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                            asChild
                          >
                            <Link href={`/grading?studentId=${student.id}&type=${milestone.type}&itemId=${milestone.id}`}>
                              {milestone.action}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}