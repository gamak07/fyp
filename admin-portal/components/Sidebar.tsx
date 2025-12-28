"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  RiDashboardLine, 
  RiUserLine, 
  RiGitMergeLine, 
  RiArchiveLine, 
  RiSettings4Line,
  RiLogoutBoxLine 
} from "react-icons/ri"; // Using Remix Icons for Admin
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  // Navigation Items
  const navItems = [
    { 
      href: "/dashboard", 
      icon: RiDashboardLine, 
      label: "Dashboard" 
    },
    { 
      href: "/users", 
      icon: RiUserLine, 
      label: "User Management" 
    },
    { 
      href: "/pairing", 
      icon: RiGitMergeLine, 
      label: "Pairing/Assignments" 
    },
    { 
      href: "/archive", 
      icon: RiArchiveLine, 
      label: "Archive Manager" 
    },
    { 
      href: "/settings", 
      icon: RiSettings4Line, 
      label: "Settings" 
    },
  ];

  return (
    <div className="sticky left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
             U
          </div>
          <h1 className="text-xl font-bold text-blue-900">UniSys Admin</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className="block">
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-base font-normal py-6 px-4", // "py-6" matches your tall button style
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          className="w-full justify-center text-base font-medium py-6 bg-red-500 hover:bg-red-600 text-white shadow-sm"
        >
          <RiLogoutBoxLine className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}