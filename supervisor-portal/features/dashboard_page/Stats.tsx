import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Users } from 'lucide-react';


const stats = [
    { 
      label: "Assigned Students", 
      value: "8", 
      icon: Users, 
      color: "text-blue-600", 
      bg: "bg-blue-100" 
    },
    { 
      label: "Pending Reviews", 
      value: "5", 
      icon: Clock, 
      color: "text-yellow-600", 
      bg: "bg-yellow-100" 
    },
    { 
      label: "Deadlines Approaching", 
      value: "3", 
      icon: Calendar, 
      color: "text-red-600", 
      bg: "bg-red-100" 
    },
  ];

export default function Stats() {
  return (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
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
