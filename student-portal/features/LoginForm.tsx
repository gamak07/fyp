"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentLogin } from "@/lib/actions/auth"; // Import the action
import { toast } from "sonner"; // Ensure sonner is installed

const initialState = {
  success: false,
  message: "",
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(studentLogin, initialState);

  // Show toast on error
  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <main className="min-w-md p-4 flex items-center self-center mx-auto shadow-lg bg-white rounded-xl border border-gray-100">
      <div className="w-full p-4">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Student Portal</h1>
          <p className="text-gray-500">Final Year Project System</p>
        </div>
        
        <form action={formAction} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-gray-700">Email Address</Label>
            <Input 
              id="email" 
              name="email" // Crucial for FormData
              type="email"
              placeholder="student@university.edu" 
              className="py-6 border-gray-300 focus-visible:ring-blue-600"
              required
            />
          </div>
          
          {/* Matric Number Input */}
          <div className="space-y-2">
            <Label htmlFor="matric" className="font-medium text-gray-700">Matriculation Number</Label>
            <Input 
              id="matric" 
              name="matric" // Crucial for FormData
              type="text" 
              placeholder="e.g. A123456" 
              className="py-6 border-gray-300 focus-visible:ring-blue-600"
              required
            />
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-md shadow-blue-200 transition-all disabled:opacity-70"
          >
            {isPending ? "Verifying..." : "Access Portal"}
          </Button>
        </form>

      </div>
    </main>
  );
}