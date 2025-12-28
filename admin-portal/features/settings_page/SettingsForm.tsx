"use client";

import { useState } from "react";
import { RiSaveLine } from "react-icons/ri";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateSettings, type SystemConfig } from "@/lib/actions/settings"; // Import Action
import { toast } from "sonner"; // Import Toast

interface SettingsFormProps {
  initialConfig: SystemConfig;
}

export default function SettingsForm({ initialConfig }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<SystemConfig>(initialConfig);

  const handleSave = async () => {
    setLoading(true);
    
    // Call Server Action
    const result = await updateSettings(config);
    
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">System Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          
          {/* System Name Input */}
          <div className="space-y-2">
            <Label htmlFor="systemName" className="text-sm font-medium text-gray-700">
              System Name
            </Label>
            <Input 
              id="systemName" 
              value={config.systemName}
              onChange={(e) => setConfig({...config, systemName: e.target.value})}
              className="py-6 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          {/* Max Students Input */}
          <div className="space-y-2">
            <Label htmlFor="maxStudents" className="text-sm font-medium text-gray-700">
              Max Students Per Supervisor
            </Label>
            <Input 
              id="maxStudents" 
              type="number" 
              value={config.maxStudents}
              onChange={(e) => setConfig({...config, maxStudents: e.target.value})}
              className="py-6 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          {/* Academic Year Input */}
          <div className="space-y-2">
            <Label htmlFor="academicYear" className="text-sm font-medium text-gray-700">
              Current Academic Year
            </Label>
            <Input 
              id="academicYear" 
              value={config.academicYear}
              onChange={(e) => setConfig({...config, academicYear: e.target.value})}
              className="py-6 border-gray-300 focus-visible:ring-blue-500"
            />
          </div>

          {/* Toggles Section */}
          <div className="space-y-6 pt-4 border-t border-gray-200">
            
            {/* Toggle 1: Self Registration */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="self-reg" className="text-base font-medium text-gray-900">
                  Allow Self Registration
                </Label>
                <p className="text-sm text-gray-600">
                  Students can register themselves
                </p>
              </div>
              <Switch 
                id="self-reg"
                checked={config.allowSelfRegistration}
                onCheckedChange={(checked) => setConfig({...config, allowSelfRegistration: checked})}
              />
            </div>

            {/* Toggle 2: Require Approval */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="req-approval" className="text-base font-medium text-gray-900">
                  Require Admin Approval
                </Label>
                <p className="text-sm text-gray-600">
                  New registrations need approval
                </p>
              </div>
              <Switch 
                id="req-approval"
                checked={config.requireApproval}
                onCheckedChange={(checked) => setConfig({...config, requireApproval: checked})}
              />
            </div>

          </div>

          {/* Save Button */}
          <div className="pt-6">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full py-6 h-auto text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-all"
            >
              <RiSaveLine className="w-5 h-5" />
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}