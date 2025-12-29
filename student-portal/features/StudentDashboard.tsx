import { Check, Clock, User, AlertCircle, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStudentDashboardData } from "@/lib/actions/student-dashboard";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default async function StudentDashboard() {
  const { studentName, projectTitle, timeline, latestFeedback } = await getStudentDashboardData();

  // Helper to render timeline icons/colors based on status
  const getStageStyles = (status: string) => {
    switch(status) {
      case 'completed': return { bg: 'bg-green-500', icon: Check, badge: 'bg-green-100 text-green-700', label: 'Completed' };
      case 'in_progress': return { bg: 'bg-yellow-500', icon: Clock, badge: 'bg-yellow-100 text-yellow-700', label: 'In Progress' };
      case 'rejected': return { bg: 'bg-red-500', icon: AlertCircle, badge: 'bg-red-100 text-red-700', label: 'Rejected' };
      default: return { bg: 'bg-gray-200 border-2 border-white', icon: Lock, badge: 'text-gray-400', label: 'Locked' };
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {studentName}</h1>
        <p className="text-blue-100 opacity-90">{projectTitle}</p>
      </div>

      {/* Timeline Card */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Scrollable container for small screens */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center justify-between relative mt-4 min-w-[600px]">
              
              {/* Connecting Line */}
              <div className="absolute top-[20px] left-0 w-full h-1 bg-gray-100 -z-10" />

              {timeline.map((stage, index) => {
                const styles = getStageStyles(stage.status);
                const Icon = styles.icon;

                return (
                  <div key={stage.id} className="flex flex-col items-center bg-white/0 px-2 min-w-[100px]">
                    {/* Circle Icon */}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shadow-sm z-10 transition-colors",
                      styles.bg,
                      stage.status === 'pending' ? "text-gray-400" : "text-white"
                    )}>
                      {stage.status === 'pending' ? (
                        <span className="font-bold text-sm">{index + 1}</span>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Text Label */}
                    <div className="mt-3 text-center">
                      <p className={cn("font-semibold text-sm", stage.status === 'pending' ? "text-gray-400" : "text-gray-800")}>
                        {stage.label}
                      </p>
                      
                      {stage.status !== 'pending' ? (
                        <Badge variant="secondary" className={cn("mt-1 text-xs", styles.badge)}>
                          {styles.label}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-300 mt-1 block">Pending</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Card */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Supervisor Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {latestFeedback ? (
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-4 rounded-r">
              <p className="text-gray-800 mb-3 italic">"{latestFeedback.text}"</p>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="font-medium text-gray-700">{latestFeedback.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{formatDistanceToNow(latestFeedback.date, { addSuffix: true })}</span>
                </div>
                <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                  Re: {latestFeedback.source}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
              <p>No feedback received yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}