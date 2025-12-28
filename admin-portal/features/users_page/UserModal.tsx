"use client";

import { useEffect, useState, useActionState } from "react"; // Changed import to 'react'
import { RiCloseLine } from "react-icons/ri";
import { saveStudent, saveSupervisor } from "@/lib/actions/user";
import { toast } from "sonner"; 

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "supervisors" | "students";
  mode: "add" | "edit";
  initialData?: any;
}

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function UserModal({ 
  isOpen, 
  onClose, 
  type, 
  mode, 
  initialData 
}: UserModalProps) {
  
  // 1. Select the correct Server Action
  const action = type === "supervisors" ? saveSupervisor : saveStudent;
  
  // 2. Use the new React 19 hook
  // Returns: [state, dispatchFunction, isPendingBoolean]
  const [state, formAction, isPending] = useActionState(action, initialState);
  
  // Local state for form fields
  const [fields, setFields] = useState({
    name: "",
    email: "",
    department: "",
    matric: ""
  });

  // Effect 1: Populate form when opening
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        // FIX: Use '?? ""' to ensure undefined/null becomes an empty string
        // This prevents the "controlled input to be uncontrolled" error
        setFields({
          name: initialData.name ?? "",
          email: initialData.email ?? "",
          department: initialData.department ?? "", 
          matric: initialData.matric_no ?? ""      
        });
      } else {
        // Reset for Add Mode
        setFields({ name: "", email: "", department: "", matric: "" });
      }
    }
  }, [isOpen, mode, initialData]);

  // Effect 2: Handle Toasts & Closing
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        onClose();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RiCloseLine className="w-6 h-6" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
          {mode === "add" ? "Add New" : "Edit"} {type === "supervisors" ? "Supervisor" : "Student"}
        </h3>

        <form action={formAction} className="space-y-4">
          
          {/* Hidden ID for updates */}
          {mode === "edit" && initialData?.id && (
            <input type="hidden" name="id" value={initialData.id} />
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === "students" ? "Student Name" : "Name"}
            </label>
            <input 
              name="name"
              type="text"
              // Fallback to empty string if state is somehow undefined
              value={fields.name ?? ""}
              onChange={(e) => setFields({ ...fields, name: e.target.value })}
              placeholder={type === "students" ? "John Doe" : "Dr. John Smith"}
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${state.errors?.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {state.errors?.name && <p className="text-sm text-red-500 mt-1">{state.errors.name[0]}</p>}
          </div>

          {/* Matric Number (Student Only) */}
          {type === "students" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matric Number
              </label>
              <input 
                name="matric"
                type="text"
                value={fields.matric ?? ""}
                onChange={(e) => setFields({ ...fields, matric: e.target.value })}
                // readOnly={mode === 'edit'}
                className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${mode === 'edit' ? 'bg-gray-100' : ''} ${state.errors?.matric ? 'border-red-500' : 'border-gray-300'}`}
              />
              {state.errors?.matric && <p className="text-sm text-red-500 mt-1">{state.errors.matric[0]}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input 
              name="email"
              type="email"
              value={fields.email ?? ""}
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${state.errors?.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>}
          </div>

          {/* Department (Supervisor Only) */}
          {type === "supervisors" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input 
                name="department"
                type="text"
                value={fields.department ?? ""}
                onChange={(e) => setFields({ ...fields, department: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${state.errors?.department ? 'border-red-500' : 'border-gray-300'}`}
              />
              {state.errors?.department && <p className="text-sm text-red-500 mt-1">{state.errors.department[0]}</p>}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            
            {/* Direct use of isPending on the button */}
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium capitalize disabled:opacity-50"
            >
              {isPending ? "Saving..." : (mode === "add" ? "Add" : "Save Changes")}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}