"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { submitProposal } from "@/lib/actions/proposal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const initialState = {
  success: false,
  message: "",
};

export default function TopicProposal() {
  const [state, formAction, isPending] = useActionState(submitProposal, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        // Optional: Redirect or clear form here
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Submit Topic Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="title1">Topic Title 1 (Primary Choice)</Label>
              <Input 
                id="title1" 
                name="title1" // Vital for formData
                placeholder="Enter your first topic choice" 
                className="py-6" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title2">Topic Title 2 (Alternative)</Label>
              <Input 
                id="title2" 
                name="title2" 
                placeholder="Enter your second topic choice" 
                className="py-6" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title3">Topic Title 3 (Alternative)</Label>
              <Input 
                id="title3" 
                name="title3" 
                placeholder="Enter your third topic choice" 
                className="py-6" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Provide a brief description of your proposed project..." 
                className="min-h-[150px]"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" 
              size="lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Proposal"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}