import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, BookOpen } from 'lucide-react'
import Link from 'next/link' // Import Link
import React from 'react'

interface ActivityItem {
  id: string;
  student: string;
  action: string;
  timeLabel: string;
  type: string;
}

export default function Activity({ activities }: { activities: ActivityItem[] }) {
  
  if (activities.length === 0) {
    return (
      <Card className="border-gray-100 shadow-sm">
        <CardHeader className="p-6 border-b border-gray-100">
           <CardTitle className="text-xl font-bold text-blue-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-gray-500">
          No recent activity found.
        </CardContent>
      </Card>
    )
  }

  return (
     <Card className="border-gray-100 shadow-sm">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-blue-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${activity.type === 'proposal' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}
                  `}>
                    {activity.type === 'proposal' ? <BookOpen className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium">
                    <span className="text-blue-700 font-bold">{activity.student}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{activity.timeLabel}</p>
                </div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 whitespace-nowrap"
                  asChild
                >
                  <Link href="/proposals">
                    View
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  )
}