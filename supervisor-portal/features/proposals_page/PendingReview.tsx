'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { FiClock, FiFileText, FiBookOpen } from "react-icons/fi"; // Added Book icon for proposals
import ReviewProposalModal from "./ReviewProposalModal";
import { formatDistanceToNow } from "date-fns";

export default function PendingReview({ proposals }: { proposals: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);

  const handleReviewClick = (proposal: any) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  if (proposals.length === 0) {
    return (
      <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100 text-center">
        <p className="text-green-700 font-medium">No pending reviews! You are all caught up.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-800">Pending Review</h2>
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium border-none">
            {proposals.length}
          </Badge>
        </div>

        <div className="space-y-4">
          {proposals.map((item) => (
            <Card
              // We use a combined key because IDs might clash between tables
              key={`${item.type}-${item.id}`} 
              className="border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Student Info */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 
                        ${item.type === 'proposal' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                        {/* Dynamic Icon: Book for Proposal, File for Chapter */}
                        {item.type === 'proposal' ? <FiBookOpen className="w-5 h-5" /> : <FiFileText className="w-5 h-5" />}
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {item.studentName} {/* FIXED: Was proposal.student.name */}
                        </h3>
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">
                            {item.matricNo} {/* FIXED: Was proposal.student.matric_no */}
                            </p>
                            <Badge variant="outline" className="text-[10px] uppercase h-5">
                                {item.type}
                            </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Proposal Details */}
                    <div className="md:ml-13">
                      <p className="text-gray-800 font-medium mb-2">
                        {item.title} {/* FIXED: Was proposal.title_1 */}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted {formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleReviewClick(item)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap"
                  >
                    Review Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Render Modal only if we have a selection */}
      {selectedProposal && (
        <ReviewProposalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          proposal={selectedProposal} 
        />
      )}
    </>
  );
}