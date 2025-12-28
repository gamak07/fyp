"use client";
import { Search, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ArchiveSearch() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Archive Search</CardTitle>
        </CardHeader>
        <CardContent>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search past projects by title, keywords, or author..." 
              className="pl-10 py-6 text-lg"
            />
          </div>

          {/* Results List */}
          <div className="space-y-4">
            
            {/* Card 1 */}
            <div className="group border rounded-lg p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">Machine Learning in E-commerce</h3>
                <Badge variant="secondary">2023</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">This study explores the implementation of various machine learning algorithms to predict customer behavior and sales trends...</p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-2" />
                <span>Ahmad Rahman</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group border rounded-lg p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">Blockchain Supply Chain</h3>
                <Badge variant="secondary">2023</Badge>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">An investigation into the practical applications of blockchain technology for improving transparency and traceability...</p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-2" />
                <span>Lisa Chen</span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}