"use client";

import { useState } from "react";
import { appConfig } from "@/appConfig";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SettingsComponent() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<{ [key: string]: boolean }>({
    notifications: true,
    twoFactor: false,
    dataSharing: true,
    darkMode: false,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Here you would save the settings to your database
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <SettingsIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-12">
              {appConfig.settings.sections.map((section) => (
                <div
                  key={section.title}
                  className="border-b border-gray-200 pb-8 last:border-b-0"
                >
                  <h2 className="text-lg font-medium text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-6">
                    {section.description}
                  </p>
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings[item.key] || false}
                            onChange={() => handleToggle(item.key)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
