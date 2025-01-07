// zustand/useProfileStore.ts

import { create } from "zustand";
import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/zustand/useAuthStore"; // If you store UID in a separate Auth store

//
// 1) Define the UserProfile interface
//
export interface UserProfile {
  email: string;
  contactEmail: string;
  displayName: string;
  phoneticName: string;
  photoUrl: string;
  emailVerified: boolean;
  credits: number;
  bio?: string;
  updatedAt?: Date | null;
  phone?: string;
  location?: string;
}

//
// 2) Create a defaultProfile object
//
const defaultProfile: UserProfile = {
  email: "",
  contactEmail: "",
  displayName: "",
  phoneticName: "",
  photoUrl: "",
  emailVerified: false,
  credits: 0,
  bio: "",
  updatedAt: null,
};

//
// 3) Define the ProfileState interface for Zustand
//
interface ProfileState {
  profile: UserProfile;
  fetchProfile: () => Promise<void>;
  updateProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
  useCredits: (amount: number) => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
}

//
// 4) Create the Zustand store
//
const useProfileStore = create<ProfileState>((set, get) => ({
  // Initialize with defaults
  profile: defaultProfile,

  /**
   * FETCH the profile from Firestore at `users/<uid>/settings/profile`.
   * If no document exists, create it using `defaultProfile`.
   */
  fetchProfile: async () => {
    const uid = useAuthStore.getState().uid;
    console.log("[fetchProfile] Called. uid =", uid);

    if (!uid) {
      console.warn("[fetchProfile] No uid found, aborting fetch.");
      return;
    }

    try {
      const profileRef = doc(db, "users", uid, "settings", "profile");
      console.log("[fetchProfile] profileRef path =", profileRef.path);

      const docSnap = await getDoc(profileRef);
      console.log("[fetchProfile] docSnap.exists() =", docSnap.exists());

      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<UserProfile>;
        console.log("[fetchProfile] docSnap data:", data);

        // If updatedAt is a Firestore Timestamp, convert to a Date
        if (data.updatedAt instanceof Timestamp) {
          console.log("[fetchProfile] Converting updatedAt Timestamp to Date.");
          data.updatedAt = data.updatedAt.toDate();
        }

        // Merge Firestore data with the default profile
        const newProfile = { ...defaultProfile, ...data };
        console.log("[fetchProfile] Merged profile:", newProfile);

        set({ profile: newProfile });
        console.log("[fetchProfile] State updated with fetched profile.");
      } else {
        // If no doc, create one using defaultProfile
        console.log(
          "[fetchProfile] No doc found; creating a new 'profile' doc with defaultProfile."
        );
        await setDoc(profileRef, defaultProfile);

        set({ profile: defaultProfile });
        console.log("[fetchProfile] State updated with defaultProfile.");
      }
    } catch (error) {
      console.error(
        "[fetchProfile] Error fetching or creating profile:",
        error
      );
    }
  },

  /**
   * UPDATE the profile in Firestore at `users/<uid>/settings/profile`.
   */
  updateProfile: async (newProfile: Partial<UserProfile>) => {
    const uid = useAuthStore.getState().uid;
    console.log("[updateProfile] Called with newProfile:", newProfile);
    console.log("[updateProfile] Current uid =", uid);

    if (!uid) {
      console.warn("[updateProfile] No uid found, aborting update.");
      return;
    }

    try {
      const profileRef = doc(db, "users", uid, "settings", "profile");
      console.log("[updateProfile] profileRef path =", profileRef.path);

      // Update local store first
      set((state) => {
        console.log("[updateProfile] Old state.profile:", state.profile);
        return { profile: { ...state.profile, ...newProfile } };
      });
      console.log("[updateProfile] State updated with newProfile.");

      // Update Firestore
      await updateDoc(profileRef, { ...newProfile });
      console.log("[updateProfile] Profile updated successfully in Firestore.");
    } catch (error) {
      console.error("[updateProfile] Error updating profile:", error);
    }
  },

  /**
   * USE some credits (decrement).
   */
  useCredits: async (amount: number) => {
    console.log("[useCredits] Called with amount:", amount);
    const uid = useAuthStore.getState().uid;
    const profile = get().profile;

    console.log(
      "[useCredits] uid =",
      uid,
      "| current credits =",
      profile.credits
    );

    if (!uid) {
      console.warn("[useCredits] No uid found, cannot use credits.");
      return false;
    }
    if (profile.credits < amount) {
      console.warn("[useCredits] Insufficient credits.");
      return false;
    }

    try {
      const newCredits = profile.credits - amount;
      const profileRef = doc(db, "users", uid, "settings", "profile");
      console.log(
        "[useCredits] profileRef =",
        profileRef.path,
        "| newCredits =",
        newCredits
      );

      await updateDoc(profileRef, { credits: newCredits });
      set({ profile: { ...profile, credits: newCredits } });
      console.log("[useCredits] Credits decremented successfully.");
      return true;
    } catch (error) {
      console.error("[useCredits] Error using credits:", error);
      return false;
    }
  },

  /**
   * ADD credits (increment).
   */
  addCredits: async (amount: number) => {
    console.log("[addCredits] Called with amount:", amount);
    const uid = useAuthStore.getState().uid;
    const profile = get().profile;

    console.log(
      "[addCredits] uid =",
      uid,
      "| current credits =",
      profile.credits
    );

    if (!uid) {
      console.warn("[addCredits] No uid found, cannot add credits.");
      return;
    }

    try {
      const newCredits = profile.credits + amount;
      const profileRef = doc(db, "users", uid, "settings", "profile");
      console.log(
        "[addCredits] profileRef =",
        profileRef.path,
        "| newCredits =",
        newCredits
      );

      await updateDoc(profileRef, { credits: newCredits });
      set({ profile: { ...profile, credits: newCredits } });
      console.log("[addCredits] Credits incremented successfully.");
    } catch (error) {
      console.error("[addCredits] Error adding credits:", error);
    }
  },
}));

export default useProfileStore;
