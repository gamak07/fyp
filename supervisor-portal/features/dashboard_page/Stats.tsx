import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Users } from 'lucide-react';

interface StatsProps {
  stats: {
    students: number;
    pending: number;
    deadlines: number;
  }
}

export default function Stats({ stats }: StatsProps) {
  
  const statItems = [
    { 
      label: "Assigned Students", 
      value: stats.students, 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100" 
    },
    { 
      label: "Pending Reviews", 
      value: stats.pending, 
      icon: Clock, 
      color: "text-yellow-600", 
      bg: "bg-yellow-100" 
    },
    // Keeping Deadlines as 0/placeholder for now
    { 
      label: "Deadlines Approaching", 
      value: stats.deadlines, 
      icon: Calendar, 
      color: "text-red-600", 
      bg: "bg-red-100" 
    },
  ];

  return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statItems.map((stat, index) => (
          <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              </div>
              <h3 className="text-gray-600 font-medium">{stat.label}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
  )
}