import { Check, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John Smith</h1>
        <p className="text-blue-100">Track your Final Year Project progress and stay updated.</p>
      </div>

      {/* Timeline Card */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between relative mt-4">
            {/* Connecting Line Background */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2" />

            {/* Stage 1 */}
            <div className="flex flex-col items-center bg-white px-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-sm z-10">
                <Check className="text-white w-5 h-5" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-semibold text-sm">Topic Proposed</p>
                <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex flex-col items-center bg-white px-2">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm z-10">
                <Clock className="text-white w-5 h-5" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-semibold text-sm">Chapter 1</p>
                <Badge variant="secondary" className="mt-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex flex-col items-center bg-white px-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm z-10 border-2 border-white">
                <span className="text-gray-500 font-bold">2</span>
              </div>
              <div className="mt-3 text-center">
                <p className="font-semibold text-gray-500 text-sm">Chapter 2</p>
                <span className="text-xs text-gray-400">Pending</span>
              </div>
            </div>

            {/* Final Stage */}
            <div className="flex flex-col items-center bg-white px-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm z-10 border-2 border-white">
                <span className="text-gray-500 font-bold">F</span>
              </div>
              <div className="mt-3 text-center">
                <p className="font-semibold text-gray-500 text-sm">Final Submission</p>
                <span className="text-xs text-gray-400">Locked</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-2 rounded-r">
            <p className="text-gray-700 mb-3">Good progress on your topic proposal. Please refine the research objectives and provide more specific methodology details for Chapter 1.</p>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Dr. Sarah Johnson</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>2 days ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}