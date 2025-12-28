"use client";

import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteUser } from "@/lib/actions/user";
import { toast } from "sonner";

interface StudentsTableProps {
  data: any[];
  onEdit: (student: any) => void; // Added Prop
}

export default function StudentsTable({ data, onEdit }: StudentsTableProps) {
  const handleDelete = async (id: string) => {
    await deleteUser(id, "students");
    toast.success("Student deleted successfully");
  };
  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Matric No
            </TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student) => (
            <TableRow key={student.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {student.name}
              </TableCell>
              <TableCell className="font-mono text-gray-600">
                {student.matric_no}
              </TableCell>
              <TableCell className="text-gray-600">{student.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {/* Edit Button Hooked Up */}
                  <Button
                    onClick={() => onEdit(student)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 h-8 w-8"
                  >
                    <RiEditLine className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                    onClick={() => handleDelete(student.id)}
                  >
                    <RiDeleteBinLine className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
