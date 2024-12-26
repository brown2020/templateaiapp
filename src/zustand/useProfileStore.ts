import { create } from "zustand";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/zustand/useAuthStore";

export interface ProfileType {
  email: string;
  contactEmail: string;
  displayName: string;
  phoneticName: string;
  photoUrl: string;
  emailVerified: boolean;
  credits: number;
}

const defaultProfile: ProfileType = {
  email: "",
  contactEmail: "",
  displayName: "",
  phoneticName: "",
  photoUrl: "",
  emailVerified: false,
  credits: 0,
};

interface ProfileState {
  profile: ProfileType;
  fetchProfile: () => Promise<void>;
  updateProfile: (newProfile: Partial<ProfileType>) => Promise<void>;
  useCredits: (amount: number) => Promise<boolean>;
  addCredits: (amount: number) => Promise<void>;
}

const useProfileStore = create<ProfileState>((set, get) => ({
  profile: defaultProfile,

  fetchProfile: async () => {
    const uid = useAuthStore.getState().uid;
    if (!uid) return;

    try {
      const userRef = doc(db, `users/${uid}/settings/profile`);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const d = docSnap.data() as ProfileType;
        console.log("Profile found:", d);

        const newProfile = createNewProfile(d);

        await setDoc(userRef, newProfile, { merge: true });
        set({ profile: newProfile });
      } else {
        const newProfile = createNewProfile();
        await setDoc(userRef, newProfile);
        set({ profile: newProfile });
        console.log("No profile found. Creating new profile document.");
      }
    } catch (error) {
      console.error("Error fetching or creating profile:", error);
    }
  },

  updateProfile: async (newProfile: Partial<ProfileType>) => {
    const uid = useAuthStore.getState().uid;
    if (!uid) return;

    try {
      const userRef = doc(db, `users/${uid}/settings/profile`);

      set((state) => ({
        profile: { ...state.profile, ...newProfile },
      }));

      await updateDoc(userRef, { ...newProfile });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },

  useCredits: async (amount: number) => {
    const uid = useAuthStore.getState().uid;
    if (!uid) return false;

    const profile = get().profile;
    if (profile.credits < amount) {
      console.warn("Insufficient credits");
      return false;
    }

    try {
      const newCredits = profile.credits - amount;
      const userRef = doc(db, `users/${uid}/settings/profile`);

      await updateDoc(userRef, { credits: newCredits });
      set((state) => ({
        profile: { ...state.profile, credits: newCredits },
      }));

      return true;
    } catch (error) {
      console.error("Error using credits:", error);
      return false;
    }
  },

  addCredits: async (amount: number) => {
    const uid = useAuthStore.getState().uid;
    if (!uid) return;

    const profile = get().profile;
    const newCredits = profile.credits + amount;

    try {
      const userRef = doc(db, `users/${uid}/settings/profile`);

      await updateDoc(userRef, { credits: newCredits });
      set((state) => ({
        profile: { ...state.profile, credits: newCredits },
      }));
    } catch (error) {
      console.error("Error adding credits:", error);
    }
  },
}));

// Helper function to create a new profile or merge with default
function createNewProfile(data?: ProfileType): ProfileType {
  const authState = useAuthStore.getState();
  const credits = data && data.credits > 1000 ? data.credits : 10000;

  return {
    ...defaultProfile,
    ...data,
    credits,
    email: authState.authEmail || data?.email || "",
    contactEmail: data?.contactEmail || authState.authEmail || "",
    displayName: data?.displayName || authState.authDisplayName || "",
    photoUrl: data?.photoUrl || authState.authPhotoUrl || "",
  };
}

export default useProfileStore;
