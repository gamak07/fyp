"use client";

import { useState, useActionState, useEffect } from "react";
import { FiX, FiDownload, FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Import Input
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { submitReview } from "@/lib/actions/review";

interface ReviewProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: any; // This is now the "Unified Item" (Proposal OR Chapter)
}

const initialState = { success: false, message: "" };

export default function ReviewProposalModal({ isOpen, onClose, proposal }: ReviewProposalModalProps) {
  
  const [decision, setDecision] = useState<"approved" | "revision" | "rejected" | null>(null);
  const [comments, setComments] = useState("");
  const [grade, setGrade] = useState(""); // State for Grade
  const [state, formAction, isPending] = useActionState(submitReview, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        onClose();
        setDecision(null);
        setComments("");
        setGrade("");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onClose]);

  if (!isOpen || !proposal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Review {proposal.type === 'chapter' ? 'Chapter' : 'Proposal'}
            </h2>
            <p className="text-gray-600 mt-1">{proposal.studentName} • {proposal.matricNo}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          
          {/* --- DYNAMIC CONTENT DISPLAY --- */}
          <div className="mb-6 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Submission Title</h3>
            <p className="text-lg font-semibold text-gray-900 mb-4">{proposal.title}</p>
            
            {proposal.type === 'proposal' ? (
              // PROPOSAL: Show Description
              <>
                <h3 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{proposal.description}</p>
              </>
            ) : (
              // CHAPTER: Show File Download
              <div className="flex items-center gap-4 bg-white p-3 rounded border border-blue-200">
                <div className="bg-blue-100 p-2 rounded">
                  <FiFileText className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Chapter Document</p>
                  <p className="text-xs text-gray-500">Click to view submission</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto" onClick={() => window.open(proposal.fileUrl, '_blank')}>
                  <FiDownload className="mr-2" /> View File
                </Button>
              </div>
            )}
          </div>

          {/* --- FORM --- */}
          <form action={formAction}>
            <input type="hidden" name="id" value={proposal.id} />
            <input type="hidden" name="type" value={proposal.type} />
            <input type="hidden" name="studentId" value={proposal.studentId} />
            <input type="hidden" name="decision" value={decision || ""} />
            <input type="hidden" name="comments" value={comments} />
            
            {/* Grade Input - Only visible for Chapters when Approved */}
            {proposal.type === 'chapter' && decision === 'approved' && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade (0-100)</label>
                <Input 
                  name="grade" 
                  type="number" 
                  min="0" max="100" 
                  placeholder="Enter score e.g. 85"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="py-6 text-lg"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Decision</label>
              <div className="space-y-3">
                {/* Approve */}
                <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50", decision === "approved" ? "border-green-600 bg-green-50/10" : "border-gray-200")}>
                  <input type="radio" name="ui_decision" value="approved" className="w-4 h-4 text-green-600" onChange={() => setDecision("approved")} checked={decision === "approved"} />
                  <div><p className="font-medium text-gray-800">Approve</p></div>
                </label>
                {/* Revision */}
                <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50", decision === "revision" ? "border-yellow-500 bg-yellow-50/10" : "border-gray-200")}>
                  <input type="radio" name="ui_decision" value="revision" className="w-4 h-4 text-yellow-600" onChange={() => setDecision("revision")} checked={decision === "revision"} />
                  <div><p className="font-medium text-gray-800">Request Revision</p></div>
                </label>
                {/* Reject */}
                <label className={cn("flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50", decision === "rejected" ? "border-red-500 bg-red-50/10" : "border-gray-200")}>
                  <input type="radio" name="ui_decision" value="rejected" className="w-4 h-4 text-red-600" onChange={() => setDecision("rejected")} checked={decision === "rejected"} />
                  <div><p className="font-medium text-gray-800">Reject</p></div>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Comments</label>
              <Textarea 
                placeholder="Provide detailed feedback..." 
                className="min-h-[120px] resize-none text-base p-4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} disabled={isPending} className="flex-1 py-6 h-auto text-base">Cancel</Button>
              <Button type="submit" disabled={!decision || isPending} className="flex-1 py-6 h-auto text-base bg-blue-600 hover:bg-blue-700 text-white">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Review"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}