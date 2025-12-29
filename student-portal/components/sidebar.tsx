"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Lightbulb, Upload, Archive, LogOut } from "lucide-react";
import { cn } from "@/lib/utils"; // Shadcn utility
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/actions/auth";

export default function Sidebar() {
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className="block w-full mb-2">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start text-base font-normal py-6",
            isActive
              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          <Icon className="mr-3 h-5 w-5" />
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex-shrink-0 h-screen sticky top-0 border-r">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-900">FYP Portal</h2>
      </div>
      <nav className="flex-1 mt-6 px-4">
        <NavItem href="/" icon={Home} label="Dashboard" />
        <NavItem href="/proposal" icon={Lightbulb} label="Topic Proposal" />
        <NavItem href="/upload" icon={Upload} label="Chapter Upload" />
        <NavItem href="/archive" icon={Archive} label="Archive Search" />
      </nav>
      <div className="mt-6 px-4">
        <Button
          className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors cursor-pointer !text-red-600 bg-transparent hover:!bg-red-50 whitespace-nowrap"
          onClick={() => logout()}
        >
          <LogOut className="mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
