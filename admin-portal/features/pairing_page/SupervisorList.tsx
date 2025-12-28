"use client";

import { RiTeamLine } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Supervisor {
  id: string;
  name: string;
  dept: string;
  current: number;
  max: number;
}

interface SupervisorListProps {
  supervisors: Supervisor[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SupervisorList({ supervisors, selectedId, onSelect }: SupervisorListProps) {
  
  // Helper to calculate progress bar color
  const getProgressColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 100) return "bg-red-500";
    if (percentage >= 80) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Supervisors</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1 text-sm font-semibold">
            {supervisors.length} supervisors
          </Badge>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {supervisors.map((supervisor) => {
            const isFull = supervisor.current >= supervisor.max;
            const isSelected = selectedId === supervisor.id;

            return (
              <div
                key={supervisor.id}
                onClick={() => !isFull && onSelect(supervisor.id)}
                className={cn(
                  "p-4 border-2 rounded-lg transition-all",
                  isFull
                    ? "bg-gray-50 opacity-60 cursor-not-allowed border-gray-200"
                    : "cursor-pointer hover:border-blue-300 hover:bg-gray-50",
                  isSelected && !isFull
                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                    : "border-gray-200"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{supervisor.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{supervisor.dept}</p>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 flex items-center gap-1">
                      <RiTeamLine className="w-4 h-4" /> Capacity
                    </span>
                    <span className={cn("font-semibold", isFull ? "text-red-600" : "text-gray-900")}>
                      {supervisor.current}/{supervisor.max}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn("h-2 rounded-full transition-all", getProgressColor(supervisor.current, supervisor.max))}
                      style={{ width: `${(supervisor.current / supervisor.max) * 100}%` }}
                    />
                  </div>
                  {isFull && (
                    <p className="text-xs text-red-600 mt-2 font-medium">Full capacity reached</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}