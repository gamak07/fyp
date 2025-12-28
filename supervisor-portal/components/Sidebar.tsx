"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Using React Icons (Feather set for a clean look)
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiCheckCircle, 
  FiLogOut 
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  // Navigation Items Configuration
  const navItems = [
    { 
      href: "/", 
      icon: FiHome, 
      label: "Dashboard" 
    },
    { 
      href: "/students", 
      icon: FiUsers, 
      label: "My Students" 
    },
    { 
      href: "/proposals", 
      icon: FiFileText, 
      label: "Review Proposals" 
    },
    { 
      href: "/grading", 
      icon: FiCheckCircle, 
      label: "Grading" 
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
             S
          </div>
          <h1 className="text-xl font-bold text-blue-900">FYP Supervisor</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} className="block">
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-base font-normal py-6 px-4 mb-1",
                    isActive
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost"
          className="w-full justify-start text-base font-normal py-6 px-4 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <FiLogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}