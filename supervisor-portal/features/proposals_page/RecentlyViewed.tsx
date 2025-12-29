import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react'
import { FiCheckCircle, FiFileText } from 'react-icons/fi';
import { formatDistanceToNow } from "date-fns";

export default function RecentlyViewed({ proposals }: { proposals: any[] }) {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return "bg-green-100 text-green-700 hover:bg-green-100";
      case 'rejected': return "bg-red-100 text-red-700 hover:bg-red-100";
      default: return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"; // revision
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FiCheckCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Recently Reviewed</h2>
      </div>

      <div className="space-y-4">
        {proposals.length === 0 ? (
           <p className="text-gray-500 text-sm">No history available.</p>
        ) : proposals.map((proposal) => (
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
                      <h3 className="font-bold text-gray-800">{proposal.student.name}</h3>
                      <p className="text-sm text-gray-500">{proposal.student.matric_no}</p>
                    </div>
                    <Badge className={cn("px-3 py-1 rounded-full text-sm font-medium border-none ml-2 capitalize", getStatusColor(proposal.status))}>
                      {proposal.status}
                    </Badge>
                  </div>

                  {/* Proposal Details */}
                  <div className="md:ml-13">
                    <p className="text-gray-800 font-medium mb-2">{proposal.title_1}</p>
                    <p className="text-sm text-gray-500">
                      Reviewed {formatDistanceToNow(new Date(proposal.updated_at || proposal.created_at), { addSuffix: true })}
                    </p>
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