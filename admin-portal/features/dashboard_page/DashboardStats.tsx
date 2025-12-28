"use client";

import { 
  RiGraduationCapLine, 
  RiTeamLine, 
  RiCheckboxCircleLine, 
  RiArchiveLine 
} from "react-icons/ri";
import { Card, CardContent } from "@/components/ui/card";

// Define the shape of the data needed
interface DashboardStatsProps {
  data: {
    students: string;
    supervisors: string;
    paired: string;
    pairedSubtext: string;
    archived: string;
  };
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  // Configuration for the cards (Icons & Colors)
  const statsConfig = [
    {
      label: "Total Students",
      value: data.students,
      subtext: null,
      icon: RiGraduationCapLine,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Total Supervisors",
      value: data.supervisors,
      subtext: null,
      icon: RiTeamLine,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Paired Students",
      value: data.paired,
      subtext: data.pairedSubtext,
      icon: RiCheckboxCircleLine,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Archive Projects",
      value: data.archived,
      subtext: null,
      icon: RiArchiveLine,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <Card key={index} className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                {stat.subtext && (
                  <p className="text-sm text-gray-500 mt-1">{stat.subtext}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}