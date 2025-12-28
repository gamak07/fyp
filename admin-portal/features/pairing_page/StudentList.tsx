"use client";

import { RiUserLine } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  name: string;
  email: string;
  matric: string;
}

interface StudentListProps {
  students: Student[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function StudentList({ students, selectedId, onSelect }: StudentListProps) {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Unassigned Students</h2>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 px-3 py-1 text-sm font-semibold">
            {students.length} students
          </Badge>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => onSelect(student.id)}
              className={cn(
                "p-4 border-2 rounded-lg cursor-pointer transition-all",
                selectedId === student.id
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {student.matric}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <RiUserLine className="w-3 h-3" /> {student.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}