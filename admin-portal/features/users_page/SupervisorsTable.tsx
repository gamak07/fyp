"use client";

import { RiRefreshLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { deleteUser, regenerateAccessKey } from "@/lib/actions/user";

interface SupervisorsTableProps {
  data: any[];
  onEdit: (supervisor: any) => void; // Added Prop
}

export default function SupervisorsTable({
  data,
  onEdit,
}: SupervisorsTableProps) {
  const handleDelete = async (id: string) => {
    await deleteUser(id, "supervisors");
    toast.success("Supervisor deleted successfully");
  };

  const handleRegenerate = async (id: string) => {
    // Show loading state
    const toastId = toast.loading("Regenerating access key...");

    const result = await regenerateAccessKey(id);

    if (result.success) {
      toast.success("New access key generated", { id: toastId });
    } else {
      toast.error("Failed to regenerate key", { id: toastId });
    }
  };

  return (
    <div className="rounded-md border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-700">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Email</TableHead>
            <TableHead className="font-semibold text-gray-700">
              Department
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Access Key
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((supervisor) => (
            <TableRow key={supervisor.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {supervisor.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {supervisor.email}
              </TableCell>
              <TableCell className="text-gray-600">
                {supervisor.department}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 font-mono text-sm px-3 py-1 hover:bg-blue-200"
                >
                  {supervisor.access_key}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8"
                    onClick={() => handleRegenerate(supervisor.id)}
                  >
                    <RiRefreshLine className="mr-2 h-4 w-4" />
                    Regenerate
                  </Button>

                  {/* Edit Button Added */}
                  <Button
                    onClick={() => onEdit(supervisor)}
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
                    onClick={() => handleDelete(supervisor.id)}
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
