import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import { FiUser } from 'react-icons/fi'

 const students = [
    {
      name: "John Tan Wei Ming",
      id: "A12345678",
      title: "Machine Learning for Predictive Maintenance in Manufacturing",
      progress: 45,
      status: "Chapter 1: Submitted",
      statusColor: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    {
      name: "Sarah Lee Hui Ling",
      id: "A12345679",
      title: "Blockchain-Based Supply Chain Management System",
      progress: 20,
      status: "Proposal: Under Review",
      statusColor: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
    {
      name: "Ahmad Bin Hassan",
      id: "A12345680",
      title: "IoT-Enabled Smart Home Security System",
      progress: 60,
      status: "Chapter 2: In Progress",
      statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    },
    {
      name: "Emily Wong Xin Yi",
      id: "A12345681",
      title: "Natural Language Processing for Sentiment Analysis",
      progress: 35,
      status: "Literature Review: Submitted",
      statusColor: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    {
      name: "David Lim Choon Huat",
      id: "A12345682",
      title: "Mobile Application for Mental Health Monitoring",
      progress: 50,
      status: "Methodology: Submitted",
      statusColor: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    {
      name: "Nurul Aisyah Binti Ismail",
      id: "A12345683",
      title: "Computer Vision for Automated Quality Inspection",
      progress: 25,
      status: "Proposal: Approved",
      statusColor: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    {
      name: "Michael Chen Kai Wen",
      id: "A12345684",
      title: "Cloud-Based E-Learning Platform with AI Tutoring",
      progress: 70,
      status: "Chapter 3: In Progress",
      statusColor: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    },
    {
      name: "Priya Devi A/P Suresh",
      id: "A12345685",
      title: "Augmented Reality for Interactive Museum Experiences",
      progress: 55,
      status: "Data Collection: Ongoing",
      statusColor: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
  ];

export default function StudentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student, index) => (
          <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FiUser className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.id}</p>
                </div>
              </div>

              {/* Project Title */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Project Title:</p>
                <p className="text-sm text-gray-800 line-clamp-2 h-10">{student.title}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-blue-600">{student.progress}%</span>
                </div>
                {/* Using standard div for exact visual match as Shadcn Progress styling varies by theme */}
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

              {/* Action Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base">
                View Progress
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
  )
}
