"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FiUser } from 'react-icons/fi'
import Link from "next/link"; // Import Link

// Define the shape of our student data
interface StudentGridProps {
  students: {
    id: string;
    name: string;
    matricNo: string;
    title: string;
    progress: number;
    status: string;
    statusColor: string;
  }[];
}

export default function StudentGrid({ students }: StudentGridProps) {
  
  if (students.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
        <p className="text-gray-500 text-lg">No students have been assigned to you yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FiUser className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.matricNo}</p>
                </div>
              </div>

              {/* Project Title */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Project Title:</p>
                <p className="text-sm text-gray-800 line-clamp-2 h-10">
                  {student.title}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-blue-600">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <Badge variant="secondary" className={cn("px-3 py-1 text-xs font-medium rounded-full", student.statusColor)}>
                  {student.status}
                </Badge>
              </div>

              {/* Action Button - NOW CONNECTED */}
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base">
                <Link href={`/students/${student.id}`}>
                  View Progress
                </Link>
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>
  )
}