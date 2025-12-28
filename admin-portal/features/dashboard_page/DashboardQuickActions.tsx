"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardQuickActions() {
  return (
    <Card className="shadow-sm border-gray-200 mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => console.log("Register Batch")}
            className="px-6 py-6 h-auto bg-blue-600 hover:bg-blue-700 text-base font-medium"
          >
            Register Batch
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log("New Session")}
            className="px-6 py-6 h-auto text-blue-600 border-2 border-blue-600 hover:bg-blue-50 text-base font-medium"
          >
            New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}