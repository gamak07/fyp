"use client";

import { useActionState, useEffect } from "react"; // Import from 'react'
import { toast } from "sonner";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiLoginBoxLine,
  RiAdminLine,
} from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/lib/actions/auth";

export default function AdminLogin() {
  // useActionState returns [state, action, isPending]
  // We initialize it with 'null' or our initial state object
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  // Watch for errors in the state and trigger the toast
  useEffect(() => {
    if (state?.error) {
      toast.error("Login Failed", {
        description: state.error,
        duration: 4000,
      });
    }
  }, [state]);

  return (
    <div className="w-full max-w-md">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
          <RiAdminLine className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">UniSys Admin</h1>
        <p className="text-gray-600">Sign in to access the admin portal</p>
      </div>

      {/* Login Card */}
      <Card className="rounded-2xl shadow-lg border-gray-100">
        <CardContent className="p-8">
          
          <form action={formAction} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiMailLine className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@unisys.edu"
                  className="pl-12 pr-4 py-6 border-gray-300 focus-visible:ring-blue-500 rounded-lg text-base"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <RiLockPasswordLine className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-12 pr-4 py-6 border-gray-300 focus-visible:ring-blue-500 rounded-lg text-base"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            {/* We can now use 'isPending' directly here! No separate component needed. */}
            <Button
              type="submit"
              className="w-full py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={isPending}
            >
              {isPending ? (
                "Signing In..."
              ) : (
                <div className="flex items-center gap-2">
                  <RiLoginBoxLine className="w-5 h-5" />
                  Sign In
                </div>
              )}
            </Button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-bold text-blue-900 mb-2 uppercase tracking-wide">
              Demo Credentials:
            </p>
            <div className="space-y-1">
              <p className="text-xs text-blue-700 font-mono">
                Email: admin@unisys.edu
              </p>
              <p className="text-xs text-blue-700 font-mono">
                Password: admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}