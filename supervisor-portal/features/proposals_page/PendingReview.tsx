'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { FiClock, FiFileText } from "react-icons/fi";
import ReviewProposalModal from "./ReviewProposalModal";

const pendingProposals = [
  {
    id: "1",
    studentName: "Sarah Chen Li Ying",
    matricNo: "A12345679",
    title:
      "Blockchain-based Supply Chain Management System for Healthcare Industry",
    submitted: "2 days ago",
  },
  {
    id: "2",
    studentName: "Ahmad bin Hassan",
    matricNo: "A12345680",
    title: "AI-Powered Chatbot for Mental Health Support in Universities",
    submitted: "3 days ago",
  },
  {
    id: "3",
    studentName: "Priya Sharma",
    matricNo: "A12345681",
    title:
      "IoT-based Smart Parking System with Real-time Availability Tracking",
    submitted: "5 days ago",
  },
];

export default function PendingReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <FiClock className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-800">Pending Review</h2>
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium border-none">
            {pendingProposals.length}
          </Badge>
        </div>

        <div className="space-y-4">
          {pendingProposals.map((proposal) => (
            <Card
              key={proposal.id}
              className="border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Student Info */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FiFileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {proposal.studentName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {proposal.matricNo}
                        </p>
                      </div>
                    </div>

                    {/* Proposal Details */}
                    <div className="md:ml-13">
                      <p className="text-gray-800 font-medium mb-2">
                        {proposal.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted {proposal.submitted}
                      </p>
                    </div>
                  </div>

                  <Button onClick={()=>setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap">
                    Review Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ReviewProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
