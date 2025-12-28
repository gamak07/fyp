import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import React from 'react'

const activities = [
    {
      student: "John Tan Wei Ming",
      action: "submitted Chapter 1",
      time: "2 hours ago",
    },
    {
      student: "Sarah Lee Hui Ling",
      action: "submitted Proposal Draft",
      time: "5 hours ago",
    },
    {
      student: "Ahmad Bin Hassan",
      action: "requested meeting",
      time: "1 day ago",
    },
    {
      student: "Emily Wong Xin Yi",
      action: "submitted Literature Review",
      time: "1 day ago",
    },
    {
      student: "David Lim Choon Huat",
      action: "submitted Methodology",
      time: "2 days ago",
    },
  ];


export default function Activity() {
  return (
     <Card className="border-gray-100 shadow-sm">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-blue-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium">
                    <span className="text-blue-700">{activity.student}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap"
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  )
}
