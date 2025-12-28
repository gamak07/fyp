"use client";

import { useState, useTransition } from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { assignStudent } from "@/lib/actions/pairing"; // Import Action

import StudentList from "./StudentList";
import SupervisorList from "./SupervisorList";

interface PairingManagerProps {
  students: any[];
  supervisors: any[];
}

export default function PairingManager({ students, supervisors }: PairingManagerProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePairing = () => {
    if (!selectedStudent || !selectedSupervisor) return;

    // Use transition for loading state
    startTransition(async () => {
      const result = await assignStudent(selectedStudent, selectedSupervisor);
      
      if (result.success) {
        toast.success("Pairing Successful!");
        setSelectedStudent(null);
        setSelectedSupervisor(null);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="p-8">
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <RiCheckDoubleLine className="text-blue-600 mt-1 w-5 h-5 flex-shrink-0" />
        <p className="text-blue-900 font-medium">
          <strong>How to pair:</strong> Select a student from the left panel, then select a supervisor from the right panel, and click "Confirm Pairing".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <StudentList 
          students={students} 
          selectedId={selectedStudent} 
          onSelect={setSelectedStudent} 
        />

        <SupervisorList 
          supervisors={supervisors} 
          selectedId={selectedSupervisor} 
          onSelect={setSelectedSupervisor} 
        />

      </div>

      <div className="mt-8 flex justify-center pb-8">
        <Button
          onClick={handlePairing}
          disabled={!selectedStudent || !selectedSupervisor || isPending}
          className={cn(
            "px-12 py-6 h-auto text-lg font-semibold rounded-lg transition-all shadow-lg",
            selectedStudent && selectedSupervisor
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          )}
        >
          {isPending ? "Assigning..." : "Confirm Pairing"}
        </Button>
      </div>

    </div>
  );
}