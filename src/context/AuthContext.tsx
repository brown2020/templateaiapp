"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onIdTokenChanged,
  getIdTokenResult,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { setCookie, deleteCookie } from "cookies-next";
import { appConfig } from "@/appConfig";

// Import your Zustand auth store
import { useAuthStore } from "@/zustand/useAuthStore";

export interface UserMetadata {
  createdAt: Date;
  lastLoginAt: Date;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  metadata: UserMetadata | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signOut: () => Promise<void>;
  updateUserRole: (isAdmin: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("[AuthProvider] Rendering AuthProvider...");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [metadata, setMetadata] = useState<UserMetadata | null>(null);

  const updateUserMetadata = async (user: User, isNewUser = false) => {
    console.log(
      "[updateUserMetadata] Called. user.uid =",
      user.uid,
      "| isNewUser =",
      isNewUser
    );

    if (!user.uid) {
      console.warn("[updateUserMetadata] No user.uid found, returning early.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      const now = new Date();

      const userData = {
        lastLoginAt: serverTimestamp(),
        displayName: user.displayName ?? null,
        email: user.email ?? null,
        photoURL: user.photoURL ?? null,
        ...((!userDoc.exists() || isNewUser) && {
          createdAt: serverTimestamp(),
        }),
      };

      console.log(
        "[updateUserMetadata] Merging userData into Firestore doc:",
        userData
      );
      await setDoc(userRef, userData, { merge: true });

      const updatedDoc = await getDoc(userRef);
      const data = updatedDoc.data();
      console.log("[updateUserMetadata] Updated doc data:", data);

      if (data) {
        const lastLoginAt =
          data.lastLoginAt instanceof Timestamp
            ? data.lastLoginAt.toDate()
            : now;
        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : data.lastLoginAt instanceof Timestamp
            ? data.lastLoginAt.toDate()
            : now;

        setMetadata({
          createdAt,
          lastLoginAt,
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
        });
        console.log("[updateUserMetadata] State metadata updated:", {
          createdAt,
          lastLoginAt,
          displayName: data.displayName,
          email: data.email,
          photoURL: data.photoURL,
        });
      }
    } catch (err) {
      console.error("[updateUserMetadata] Error updating user doc:", err);
    }
  };

  // Handle token changes and admin status
  useEffect(() => {
    console.log("[AuthProvider] Setting up onIdTokenChanged listener...");

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      console.log("[onIdTokenChanged] Fired. firebaseUser =", firebaseUser);
      setLoading(true);

      if (firebaseUser) {
        try {
          // Attempt to get ID token
          const token = await firebaseUser.getIdToken();
          const tokenResult = await getIdTokenResult(firebaseUser);
          console.log(
            "[onIdTokenChanged] Got ID token, checking admin claims..."
          );

          // Set cookie with token
          setCookie(appConfig.cookieName, token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
          console.log("[onIdTokenChanged] Cookie set with token.");

          // Check admin claim
          const adminClaim = tokenResult.claims.admin === true;
          console.log("[onIdTokenChanged] adminClaim =", adminClaim);
          setIsAdmin(adminClaim);

          setUser(firebaseUser);
          console.log(
            "[onIdTokenChanged] Local user state set to firebaseUser.uid:",
            firebaseUser.uid
          );

          // Update Firestore metadata
          await updateUserMetadata(firebaseUser);

          // ***** UPDATE ZUSTAND HERE *****
          useAuthStore.setState({
            uid: firebaseUser.uid,
            authEmail: firebaseUser.email ?? "",
            authDisplayName: firebaseUser.displayName ?? "",
            // ...any other fields you want
          });
          console.log(
            "[onIdTokenChanged] Updated Zustand auth store with UID:",
            firebaseUser.uid
          );
        } catch (err) {
          console.error("[onIdTokenChanged] Token refresh error:", err);
          setError("Failed to refresh authentication");
        }
      } else {
        // Clear everything on sign out
        console.log(
          "[onIdTokenChanged] firebaseUser is null. Clearing user & cookie."
        );
        deleteCookie(appConfig.cookieName);
        setUser(null);
        setIsAdmin(false);
        setMetadata(null);

        useAuthStore.setState({
          uid: "",
          authEmail: "",
          authDisplayName: "",
          // ...any other fields you want to reset
        });
      }
      setLoading(false);
    });

    // Token refresh
    let refreshInterval: NodeJS.Timeout | undefined;
    if (user) {
      console.log(
        "[AuthProvider] Setting token refresh interval (10 min). user =",
        user.uid
      );
      refreshInterval = setInterval(async () => {
        try {
          console.log("[AuthProvider] Refreshing token manually...");
          const token = await user.getIdToken(true);
          setCookie(appConfig.cookieName, token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
          });
          console.log("[AuthProvider] Cookie re-set with refreshed token.");
        } catch (err) {
          console.error("[AuthProvider] Token refresh error in interval:", err);
        }
      }, 10 * 60 * 1000);
    }

    return () => {
      console.log(
        "[AuthProvider] Cleanup onIdTokenChanged listener & refreshInterval."
      );
      unsubscribe();
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    console.log("[signIn] Called with email:", email);
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("[signIn] Success, updating metadata...");
      await updateUserMetadata(result.user);
      return result.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("[signIn] Error:", err);
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log("[signUp] Called with email:", email);
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("[signUp] Success, updating metadata. isNewUser = true");
      await updateUserMetadata(result.user, true);
      return result.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("[signUp] Error:", err);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    console.log("[signInWithGoogle] Called");
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      console.log("[signInWithGoogle] Success, updating metadata...");
      await updateUserMetadata(result.user);
      return result.user;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("[signInWithGoogle] Error:", err);
      throw err;
    }
  };

  const signOut = async () => {
    console.log("[signOut] Called");
    try {
      setError(null);
      await firebaseSignOut(auth);
      deleteCookie(appConfig.cookieName);

      setUser(null);
      setIsAdmin(false);
      setMetadata(null);

      useAuthStore.setState({
        uid: "",
        authEmail: "",
        authDisplayName: "",
        // any other fields you want to reset
      });

      console.log("[signOut] User signed out and Zustand store cleared.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("[signOut] Error:", err);
      throw err;
    }
  };

  const updateUserRole = async (newIsAdmin: boolean) => {
    console.log("[updateUserRole] Called with newIsAdmin:", newIsAdmin);
    if (!user) {
      console.warn("[updateUserRole] No user found, cannot proceed.");
      throw new Error("No user found");
    }
    try {
      setError(null);
      const response = await fetch("/api/update-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({ isAdmin: newIsAdmin }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Force token refresh to get new claims
      console.log("[updateUserRole] Forcing token refresh...");
      await user.getIdToken(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("[updateUserRole] Error:", err);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAdmin,
    metadata,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUserRole,
  };

  console.log(
    "[AuthProvider] Returning context value. user =",
    user?.uid || null
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
