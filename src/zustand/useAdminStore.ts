// zustand/useAdminStore.ts

import { create } from "zustand";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/zustand/useAuthStore"; // If you store UID in a separate Auth store
import { UserSession } from "@/types/auth";
import { UserProfile } from "./useProfileStore";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  credits: number;
  emailVerified: boolean;
  isAdmin: boolean;
  updatedAt?: Date | null;
  profile: UserProfile;
  sessions: UserSession[];
}

interface AdminState {
  users: User[];
}

interface AdminLoaderState {
  adminLoaders: {
    users: boolean;
    [key: string]: boolean | undefined;
  };
}

interface AdminActions {
  fetchUsers: () => Promise<void>;
  setAdminLoaders: (loaders: Partial<AdminLoaderState['adminLoaders']>) => void;
}

type AdminStore = AdminState & AdminLoaderState & AdminActions;

const defaultAdminState: AdminState = {
  users: [],
};
const defaultLoaderState: AdminLoaderState = {
  adminLoaders: {
    users: false,
  },
};

const useAdminStore = create<AdminStore>((set) => ({
  ...defaultAdminState,
  ...defaultLoaderState,

  /**
   * FETCH the users from Firestore at `users`.
   */
  fetchUsers: async () => {
    const { isAdmin } = useAuthStore.getState();

    if (!isAdmin) {
      console.warn("[fetchUsers] User is not an admin, aborting fetch.");
      return;
    }

    // Set loader to true before fetching
    // set(state => ({
    //   ...state,
    //   adminLoaders: { ...state.adminLoaders, users: true }
    // }));

    try {
      const usersRef = collection(db, "users");
      const userSnapshots = await getDocs(usersRef);
      const users: User[] = [];

      // Fetch each user's data and subcollections
      for (const userDoc of userSnapshots.docs) {
        const userData = userDoc.data();

        // Fetch profile subcollection
        const profileRef = doc(db, "users", userDoc.id, "settings", "profile");
        const profileSnap = await getDoc(profileRef);
        const profileData = profileSnap.exists() ? profileSnap.data() as UserProfile : null;

        // Fetch sessions subcollection
        const sessionsRef = collection(db, "users", userDoc.id, "sessions");
        const sessionsSnap = await getDocs(sessionsRef);
        const sessions: UserSession[] = sessionsSnap.docs.map(doc => ({
          ...doc.data()
        } as UserSession));

        const updatedAt = userData.updatedAt?.toDate() || null;

        users.push({
          uid: userDoc.id,
          email: userData.email || "",
          displayName: userData.displayName || "",
          credits: userData.credits || 0,
          emailVerified: userData.emailVerified || false,
          isAdmin: userData.isAdmin || false,
          updatedAt,
          profile: profileData || {
            email: userData.email || "",
            contactEmail: userData.email || "",
            displayName: userData.displayName || "",
            phoneticName: "",
            photoUrl: "",
            emailVerified: userData.emailVerified || false,
            credits: userData.credits || 0,
          },
          sessions,
        });
      }

      set({ users });
      console.log("[fetchUsers] Users fetched successfully:", users.length);
    } catch (error) {
      console.error("[fetchUsers] Error fetching users:", error);
    }
  },

  /**
   * SET the admin loaders.
   */
  setAdminLoaders: (loaders: Partial<AdminLoaderState['adminLoaders']>) => {
    set((state) => ({
      ...state,
      adminLoaders: { ...state.adminLoaders, ...loaders },
    }));
  },

}));

export default useAdminStore;
