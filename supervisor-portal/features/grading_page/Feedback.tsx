'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useActionState, useEffect } from 'react'
import { submitGrade } from "@/lib/actions/grading";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FeedbackProps {
  studentId: string;
  itemId: string; // chapter_id
  existingGrade?: any;
  existingFeedback?: string;
}

const initialState = { success: false, message: "" };

export default function Feedback({ studentId, itemId, existingGrade, existingFeedback }: FeedbackProps) {
  const [grade, setGrade] = useState(existingGrade?.toString() || "");
  const [feedback, setFeedback] = useState(existingFeedback || "");
  const [state, formAction, isPending] = useActionState(submitGrade, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Card className="border-gray-100 shadow-sm mb-6">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-bold text-gray-800">Grade & Feedback</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form action={formAction}>
            <input type="hidden" name="studentId" value={studentId} />
            <input type="hidden" name="itemId" value={itemId} />

            {/* Grade Input */}
            <div className="mb-6">
              <Label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade (0-100)
              </Label>
              <Input
                id="grade"
                name="grade"
                type="number"
                min="0"
                max="100"
                placeholder="Enter grade (e.g., 85)"
                className="w-full px-4 py-6 border-gray-300 focus:ring-blue-500 text-base rounded-lg"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />
            </div>

            {/* Feedback Textarea */}
            <div className="mb-6">
              <Label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Comments
              </Label>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="Provide detailed feedback on the student's work..."
                className="w-full px-4 py-4 border-gray-300 focus:ring-blue-500 min-h-[150px] text-base resize-none rounded-lg"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Provide constructive feedback to help the student improve their work
              </p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-medium transition-colors"
              disabled={!grade || isPending}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Grade"}
            </Button>
          </form>
        </CardContent>
      </Card>
  )
}