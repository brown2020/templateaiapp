"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import useProfileStore from "@/zustand/useProfileStore";
import LoadingSpinner from "./LoadingSpinner";
import { handleError, handleSuccess } from "@/utils/errorHandler";

export default function ProfileComponent() {
  console.log("[ProfileComponent] Rendering...");

  const { user } = useAuth();
  const { profile, fetchProfile, updateProfile } = useProfileStore();

  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    console.log("[ProfileComponent] useEffect -> check user?.uid:", user?.uid);
    // 1) fetchProfile from Zustand if user is logged in
    if (user?.uid) {
      console.log(
        "[ProfileComponent] user?.uid found. Calling fetchProfile()..."
      );
      fetchProfile()
        .then(() => {
          console.log("[ProfileComponent] fetchProfile() completed.");
        })
        .finally(() => {
          console.log(
            "[ProfileComponent] Setting loading=false after fetchProfile."
          );
          setLoading(false);
        });
    } else {
      console.log("[ProfileComponent] No user?.uid found. Skipping fetch.");
      setLoading(false);
    }
  }, [user?.uid, fetchProfile]);

  // 2) Sync local state with the store profile
  useEffect(() => {
    console.log(
      "[ProfileComponent] Syncing local state from store profile:",
      profile
    );
    setDisplayName(profile.displayName || "");
    setBio(profile.bio || "");
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "[ProfileComponent] handleSubmit called. displayName =",
      displayName,
      "bio =",
      bio
    );

    if (!user?.uid) {
      console.warn("[ProfileComponent] No user found. handleSubmit aborting.");
      handleError(new Error("No user found"), "Failed to update profile");
      return;
    }

    try {
      // 3) Save changes using your Zustand store
      console.log("[ProfileComponent] Calling updateProfile with:", {
        displayName,
        bio,
        updatedAt: new Date(),
      });
      await updateProfile({
        displayName,
        bio,
        updatedAt: new Date(),
      });
      console.log("[ProfileComponent] updateProfile successful.");
      handleSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("[ProfileComponent] updateProfile error:", error);
      handleError(error, "Failed to update profile");
    }
  };

  if (loading) {
    console.log("[ProfileComponent] Currently loading. Returning spinner.");
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  console.log(
    "[ProfileComponent] Rendering profile form. user?.uid =",
    user?.uid
  );
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display Name */}
        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-gray-700"
          >
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                       shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Your display name"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                       shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Last updated:{" "}
            {profile.updatedAt
              ? new Date(profile.updatedAt).toLocaleDateString()
              : "Never"}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       flex items-center space-x-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
