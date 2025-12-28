import SettingsForm from "@/features/settings_page/SettingsForm";
import { getSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
 const settings = await getSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header Banner (Static) */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-blue-100">Configure system preferences</p>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        
        {/* Render Client Component with Data */}
        <SettingsForm initialConfig={settings} />

      </div>
    </div>
  );
}