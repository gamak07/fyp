import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react'
import { FiCheckCircle, FiFileText } from 'react-icons/fi';

const recentProposals = [
    {
      id: "4",
      studentName: "John Tan Wei Ming",
      matricNo: "A12345678",
      title: "Machine Learning for Predictive Maintenance in Manufacturing",
      reviewed: "1 week ago",
      status: "Approved",
      statusColor: "bg-green-100 text-green-700 hover:bg-green-100",
    },
    {
      id: "5",
      studentName: "Emily Wong",
      matricNo: "A12345682",
      title: "Mobile App for Food Waste Reduction",
      reviewed: "2 weeks ago",
      status: "Needs Revision",
      statusColor: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    },
  ];

export default function RecentlyViewed() {
  return (
    <div>
        <div className="flex items-center gap-2 mb-4">
          <FiCheckCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">Recently Reviewed</h2>
        </div>

        <div className="space-y-4">
          {recentProposals.map((proposal) => (
            <Card key={proposal.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Student Info & Status */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FiFileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{proposal.studentName}</h3>
                        <p className="text-sm text-gray-500">{proposal.matricNo}</p>
                      </div>
                      <Badge className={cn("px-3 py-1 rounded-full text-sm font-medium border-none ml-2", proposal.statusColor)}>
                        {proposal.status}
                      </Badge>
                    </div>

                    {/* Proposal Details */}
                    <div className="md:ml-13">
                      <p className="text-gray-800 font-medium mb-2">{proposal.title}</p>
                      <p className="text-sm text-gray-500">Reviewed {proposal.reviewed}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}
