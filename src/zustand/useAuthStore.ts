import { db } from "@/firebase/firebaseConfig";
import { UserSession } from "@/types/auth";
import { Timestamp, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { create } from "zustand";

// Define the state interface
interface AuthState {
  uid: string;
  authEmail: string;
  authDisplayName: string;
  authPhotoUrl: string;
  authEmailVerified: boolean;
  authReady: boolean;
  authPending: boolean;
  isAdmin: boolean;
  isAllowed: boolean;
  isInvited: boolean;
  lastSignIn: Timestamp | null;
  premium: boolean;
  sessions: UserSession[];
}

// Define the actions interface
interface AuthActions {
  setAuthDetails: (details: Partial<AuthState>) => void;
  clearAuthDetails: () => void;
}

// Combine the state and actions into one type
type AuthStore = AuthState & AuthActions;

// Define the default state
const defaultAuthState: AuthState = {
  uid: "",
  authEmail: "",
  authDisplayName: "",
  authPhotoUrl: "",
  authEmailVerified: false,
  authReady: false,
  authPending: false,
  isAdmin: false,
  isAllowed: false,
  isInvited: false,
  lastSignIn: null,
  premium: false,
  sessions: [],
};

// Create the Zustand store
export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultAuthState,

  // Set authentication details
  setAuthDetails: async (details: Partial<AuthState>) => {
    // Use functional update to ensure the latest state is used
    set((state) => {
      const newState = { ...state, ...details }; // Merge new details with the current state
      updateUserDetailsInFirestore(details, newState.uid); // Call function to update Firestore
      return newState; // Update Zustand state
    });
  },

  // Clear authentication details
  clearAuthDetails: () => set(() => ({ ...defaultAuthState })),
}));

// Function to update user details in Firestore
async function updateUserDetailsInFirestore(
  details: Partial<AuthState>,
  uid: string
) {
  if (uid) {
    const userRef = doc(db, `users/${uid}`);
    const sanitizedDetails = sanitizeAuthDetails(details);

    sanitizedDetails.lastSignIn = serverTimestamp(); // Ensure lastSignIn is a valid Timestamp

    console.log("Updating auth details in Firestore:", sanitizedDetails);
    try {
      await setDoc(userRef, sanitizedDetails, { merge: true });
      console.log("Auth details updated successfully in Firestore.");
    } catch (error) {
      console.error("Error updating auth details in Firestore:", error);
    }
  }
}

// Utility function to sanitize authentication details
function sanitizeAuthDetails(
  details: Partial<AuthState>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  Object.entries(details).forEach(([key, value]) => {
    if (value !== null && value !== undefined && typeof value !== "function") {
      sanitized[key] = value;
    }
  });
  return sanitized;
}
