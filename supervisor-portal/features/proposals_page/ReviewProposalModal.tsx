"use client";

import { useState } from "react";
import { FiX, FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ReviewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  matricNo?: string;
  projectTitle?: string;
}

export default function ReviewProposalModal({
  isOpen,
  onClose,
  studentName = "Sarah Chen Li Ying", // Default/Fallback data
  matricNo = "A12345679",
  projectTitle = "Blockchain-based Supply Chain Management System for Healthcare Industry"
}: ReviewProposalModalProps) {
  
  const [decision, setDecision] = useState<"approved" | "revision" | "rejected" | null>(null);
  const [comments, setComments] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    console.log({ decision, comments });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent click bubbling
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Review Proposal</h2>
            <p className="text-gray-600 mt-1">{studentName} • {matricNo}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Project Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Project Title</h3>
            <p className="text-gray-700 leading-relaxed">{projectTitle}</p>
          </div>

          {/* Document Preview Card */}
          <div className="mb-6 bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiFileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Project_Proposal.pdf</p>
                  <p className="text-sm text-gray-500">3.2 MB • Submitted 2 days ago</p>
                </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium whitespace-nowrap">
                View Document
              </Button>
            </div>
          </div>

          {/* Review Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Decision</label>
              <div className="space-y-3">
                
                {/* Approve Option */}
                <label 
                  className={cn(
                    "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
                    decision === "approved" ? "border-blue-600 bg-blue-50/10" : "border-gray-200"
                  )}
                >
                  <input 
                    type="radio" 
                    name="decision" 
                    value="approved" 
                    className="w-4 h-4 text-blue-600 cursor-pointer accent-blue-600"
                    onChange={() => setDecision("approved")}
                    checked={decision === "approved"}
                  />
                  <div>
                    <p className="font-medium text-gray-800">Approve Proposal</p>
                    <p className="text-sm text-gray-500">The proposal meets all requirements and can proceed</p>
                  </div>
                </label>

                {/* Revision Option */}
                <label 
                  className={cn(
                    "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
                    decision === "revision" ? "border-yellow-500 bg-yellow-50/10" : "border-gray-200"
                  )}
                >
                  <input 
                    type="radio" 
                    name="decision" 
                    value="revision" 
                    className="w-4 h-4 text-yellow-600 cursor-pointer accent-yellow-600"
                    onChange={() => setDecision("revision")}
                    checked={decision === "revision"}
                  />
                  <div>
                    <p className="font-medium text-gray-800">Request Revision</p>
                    <p className="text-sm text-gray-500">The proposal needs improvements before approval</p>
                  </div>
                </label>

                {/* Reject Option */}
                <label 
                  className={cn(
                    "flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
                    decision === "rejected" ? "border-red-500 bg-red-50/10" : "border-gray-200"
                  )}
                >
                  <input 
                    type="radio" 
                    name="decision" 
                    value="rejected" 
                    className="w-4 h-4 text-red-600 cursor-pointer accent-red-600"
                    onChange={() => setDecision("rejected")}
                    checked={decision === "rejected"}
                  />
                  <div>
                    <p className="font-medium text-gray-800">Reject Proposal</p>
                    <p className="text-sm text-gray-500">The proposal does not meet requirements</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Comments Area */}
            <div className="mb-6">
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                Review Comments
              </label>
              <Textarea 
                id="comments" 
                placeholder="Provide detailed feedback on the proposal..." 
                className="min-h-[150px] resize-none text-base p-4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide constructive feedback to help the student improve their proposal
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                className="flex-1 py-6 h-auto text-base border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!decision}
                className="flex-1 py-6 h-auto text-base bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}