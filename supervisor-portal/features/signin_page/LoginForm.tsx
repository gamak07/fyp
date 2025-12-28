"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FiEye, FiEyeOff, FiKey, FiMail } from "react-icons/fi";

export default function LoginForm() {
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    accessKey: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    console.log("Login attempt:", formData);

    setTimeout(() => {
      setIsLoading(false);
      // Add your redirect logic here, e.g., router.push('/supervisor/dashboard')
    }, 1500);
  };
  return (
    <Card className="rounded-2xl shadow-lg border-gray-100">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-blue-900">
          Sign In
        </CardTitle>
        <CardDescription>
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="supervisor@university.edu"
                className="pl-12 pr-4 py-6 text-base border-gray-300 focus-visible:ring-blue-500 rounded-lg"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Access Key Field */}
          <div className="space-y-2">
            <Label
              htmlFor="accessKey"
              className="text-sm font-medium text-gray-700"
            >
              Access Key
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiKey className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                id="accessKey"
                type={showKey ? "text" : "password"}
                placeholder="Enter your access key"
                className="pl-12 pr-12 py-6 text-base border-gray-300 focus-visible:ring-blue-500 rounded-lg"
                value={formData.accessKey}
                onChange={(e) =>
                  setFormData({ ...formData, accessKey: e.target.value })
                }
                required
              />
              {/* Toggle Visibility Button */}
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showKey ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Access key is provided by your system administrator
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
