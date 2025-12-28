"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react"; // For the button arrow
import { RiUserLine, RiGitMergeLine, RiArchiveLine } from "react-icons/ri"; // Matches your HTML icons
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLandingPage() {
  return (
      <div className="text-center max-w-2xl w-full">
        
        {/* Logo & Header */}
        <div className="mb-8">
          {/* Logo Placeholder */}
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl shadow-sm">
            U
          </div>
          <h1 className="text-5xl font-bold text-blue-900 mb-4 tracking-tight">
            UniSys FYP System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Final Year Project Management System for Universities
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/dashboard">
            <Button className="h-auto py-4 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow-lg flex items-center gap-2">
              Access Admin Portal
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          
          {/* Card 1: User Management */}
          <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <RiUserLine className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600">
                Manage students and supervisors efficiently
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Smart Pairing */}
          <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                <RiGitMergeLine className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Smart Pairing</h3>
              <p className="text-sm text-gray-600">
                Assign students to supervisors seamlessly
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Project Archive */}
          <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600">
                <RiArchiveLine className="text-2xl" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Project Archive</h3>
              <p className="text-sm text-gray-600">
                Store and manage past FYP projects
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
  );
}