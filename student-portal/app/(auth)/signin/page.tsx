"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="min-w-md p-4 flex items-center self-center mx-auto shadow-lg">
      <div className="w-full">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-blue-900">Student Portal</h1>
          <p>Final Year Project System</p>
        </div>
        <div>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>  
              <Input 
                id="email" 
                placeholder="Enter your email" 
                className="py-6"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="matric">Matriculation Number</Label>
              <Input 
                id="matric" 
                type="text" 
                placeholder="Enter your matriculation number" 
                className="py-6"
              />
            </div>
            
            <Link href="/" className="block w-full">
              <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg">
                Login
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}