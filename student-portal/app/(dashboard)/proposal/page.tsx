"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TopicProposal() {
  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Submit Topic Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Topic Title 1 (Primary Choice)</Label>
              <Input placeholder="Enter your first topic choice" className="py-6" />
            </div>
            
            <div className="space-y-2">
              <Label>Topic Title 2 (Alternative)</Label>
              <Input placeholder="Enter your second topic choice" className="py-6" />
            </div>
            
            <div className="space-y-2">
              <Label>Topic Title 3 (Alternative)</Label>
              <Input placeholder="Enter your third topic choice" className="py-6" />
            </div>
            
            <div className="space-y-2">
              <Label>Project Description</Label>
              <Textarea 
                placeholder="Provide a brief description of your proposed project, including objectives, methodology..." 
                className="min-h-[150px]"
              />
            </div>
            
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" size="lg">
              Submit Proposal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}