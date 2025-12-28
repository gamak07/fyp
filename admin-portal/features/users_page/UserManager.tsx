"use client";

import { useState } from "react";
import { RiAddLine, RiSearchLine } from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SupervisorsTable from "./SupervisorsTable";
import StudentsTable from "./StudentsTable";
import UserModal from "./UserModal"; // Updated import

interface UserManagerProps {
  supervisors: any[];
  students: any[];
}

export default function UserManager({ supervisors, students }: UserManagerProps) {
  const [activeTab, setActiveTab] = useState<"supervisors" | "students">("supervisors");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Handlers
  const handleAddClick = () => {
    setModalMode("add");
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user: any) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      
      {/* Dynamic User Modal */}
      {isModalOpen && (
        <UserModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          type={activeTab} 
          mode={modalMode} 
          initialData={selectedUser}
        />
      )}
      <Card className="shadow-sm border-gray-200">
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("supervisors")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer border-b-2 ${
                activeTab === "supervisors" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"
              }`}
            >
              Supervisors
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-4 font-medium transition-colors cursor-pointer border-b-2 ${
                activeTab === "students" ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent"
              }`}
            >
              Students
            </button>
          </div>
        </div>

        <CardContent className="p-6">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-72">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder={`Search ${activeTab}...`} className="pl-10 border-gray-300" />
            </div>
            
            <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RiAddLine className="mr-2 h-5 w-5" />
              Add {activeTab === "supervisors" ? "Supervisor" : "Student"}
            </Button>
          </div>

          {/* Tables with Edit Handlers */}
          {activeTab === "supervisors" ? (
            <SupervisorsTable 
              data={supervisors} 
              onEdit={handleEditClick} 
            />
          ) : (
            <StudentsTable 
              data={students} 
              onEdit={handleEditClick} 
            />
          )}

        </CardContent>
      </Card>
    </div>
  );
}