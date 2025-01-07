"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  User,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Import the profile store
import useProfileStore from "@/zustand/useProfileStore";

function formatDate(date: string | number | Date): string {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "N/A";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export default function ProfilePage() {
  console.log("[ProfilePage] Rendering component...");

  const { user, signOut, metadata } = useAuth();
  const router = useRouter();

  // ----- Pull from the Zustand store -----
  const {
    profile: storeProfile,
    fetchProfile,
    updateProfile,
  } = useProfileStore();

  // We'll keep local state so we can let the user type, then save changes
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    joinedDate: "",
    lastLoginDate: "",
  });

  // On mount / update, check if we have a user
  useEffect(() => {
    console.log("[ProfilePage] useEffect -> Checking user:", user);
    if (!user) {
      console.log("[ProfilePage] No user found, redirecting to /login...");
      router.push("/login");
      return;
    }

    // 1) Fetch the user profile from Firestore via Zustand
    console.log("[ProfilePage] Calling fetchProfile from Zustand...");
    fetchProfile()
      .then(() => {
        console.log(
          "[ProfilePage] fetchProfile completed. storeProfile =",
          storeProfile
        );
      })
      .catch((err) => {
        console.error("[ProfilePage] fetchProfile error:", err);
      });
  }, [user, router, fetchProfile, storeProfile]);

  // 2) Whenever the storeProfile changes, sync to local state
  useEffect(() => {
    console.log(
      "[ProfilePage] Syncing local state with storeProfile:",
      storeProfile
    );
    setProfile({
      displayName: storeProfile.displayName || "",
      email: storeProfile.email || "",
      phone: storeProfile.phone || "",
      location: storeProfile.location || "",
      bio: storeProfile.bio || "",
      joinedDate: formatDate(storeProfile.updatedAt || ""),
      lastLoginDate: "", // or storeProfile.lastLogin if you have that
    });
  }, [storeProfile]);

  // If user or metadata are available, we can set joinedDate/lastLogin from them, too
  useEffect(() => {
    if (metadata) {
      setProfile((prev) => ({
        ...prev,
        joinedDate: formatDate(metadata.createdAt),
        lastLoginDate: formatDate(metadata.lastLoginAt),
      }));
    }
  }, [metadata]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "[ProfilePage] handleUpdateProfile called. Current profile:",
      profile
    );

    if (!user?.uid) {
      console.warn(
        "[ProfilePage] No user found. handleUpdateProfile aborting."
      );
      toast.error("No user found");
      return;
    }

    setLoading(true);
    try {
      // 3) Save changes via Zustand store
      console.log("[ProfilePage] Calling updateProfile in Zustand with:", {
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        updatedAt: new Date(),
      });

      await updateProfile({
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        updatedAt: new Date(),
      });

      console.log("[ProfilePage] updateProfile success.");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("[ProfilePage] Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    console.log("[ProfilePage] handleSignOut called.");
    try {
      await signOut();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch (error) {
      console.error("[ProfilePage] Failed to sign out:", error);
      toast.error("Failed to sign out");
    }
  };

  // If still no user, or user was redirected, show nothing
  if (!user) {
    console.log("[ProfilePage] No user => returning null.");
    return null;
  }

  console.log("[ProfilePage] Rendering main content with user:", user.uid);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Profile Settings
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage your account preferences
                  </p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdateProfile} className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Your email address is your unique identifier and cannot be
                  changed.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) =>
                    setProfile({ ...profile, displayName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Member Since
                </label>
                <input
                  type="text"
                  value={profile.joinedDate}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  Last Login
                </label>
                <input
                  type="text"
                  value={profile.lastLoginDate}
                  disabled
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Tell us a little about yourself..."
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Account Settings Section */}
          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-400" />
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
