"use client";

import { Search, User, FileText, Loader2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { searchArchives, type ArchiveItem } from "@/lib/actions/archive";
import { toast } from "sonner";

export default function ArchiveSearch() {
  const [query, setQuery] = useState("");
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch archives when query changes (Debounced)
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await searchArchives(query);
        setArchives(results);
      } catch (error) {
        toast.error("Failed to load archives");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicking an archive
  const handleOpenArchive = (url: string) => {
    if (url) window.open(url, "_blank");
    else toast.error("Document not available");
  };

  return (
    <div className="p-8">
      <Card className="shadow-lg border-gray-200">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Project Archive Library
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search by title, student name, or year..." 
              className="pl-12 py-6 text-lg border-gray-300 focus-visible:ring-blue-600"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center py-12 text-blue-600">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            /* Results List */
            <div className="space-y-4">
              {archives.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No projects found matching your search.
                </div>
              ) : (
                archives.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleOpenArchive(item.document_url)}
                    className="group border rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 mr-4">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                          {item.title}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                        </h3>
                      </div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 shrink-0">
                        {item.year}
                      </Badge>
                    </div>
                    
                    {/* Abstract removed, layout adjusted */}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 font-medium pt-2 border-t border-gray-50">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-500" />
                        <span>{item.student_name}</span>
                      </div>
                      <span className="text-xs text-blue-600 group-hover:underline">
                        View Project PDF
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}