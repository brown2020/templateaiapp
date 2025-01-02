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
import { setCookie, deleteCookie } from "cookies-next"; // <-- using cookies-next
import { appConfig } from "@/appConfig";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [metadata, setMetadata] = useState<UserMetadata | null>(null);

  const updateUserMetadata = async (user: User, isNewUser = false) => {
    if (!user.uid) return;

    const userRef = doc(db, "users", user.uid);

    // First, check if the user document exists and get current data
    const userDoc = await getDoc(userRef);
    const now = new Date();

    // Prepare the update data
    const userData = {
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName || undefined,
      email: user.email || undefined,
      photoURL: user.photoURL || undefined,
      ...((!userDoc.exists() || isNewUser) && { createdAt: serverTimestamp() }),
    };

    // Update the document
    await setDoc(userRef, userData, { merge: true });

    // Get the updated document to ensure we have the latest data
    const updatedDoc = await getDoc(userRef);
    const data = updatedDoc.data();

    if (data) {
      // Convert Firestore Timestamps to Dates
      const lastLoginAt =
        data.lastLoginAt instanceof Timestamp ? data.lastLoginAt.toDate() : now;
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
    }
  };

  // Handle token changes and admin status
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        try {
          const token = await user.getIdToken();
          const tokenResult = await getIdTokenResult(user);

          // Set cookie with token using cookies-next
          setCookie(appConfig.cookieName, token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
          });

          // Check admin claim
          setIsAdmin(tokenResult.claims.admin === true);
          setUser(user);

          // Update metadata
          await updateUserMetadata(user);
        } catch (error) {
          console.error("Token refresh error:", error);
          setError("Failed to refresh authentication");
        }
      } else {
        // Clear everything on sign out
        deleteCookie(appConfig.cookieName);
        setUser(null);
        setIsAdmin(false);
        setMetadata(null);
      }
      setLoading(false);
    });

    // Set up token refresh
    let refreshInterval: NodeJS.Timeout;
    if (user) {
      refreshInterval = setInterval(async () => {
        try {
          const token = await user.getIdToken(true);
          setCookie(appConfig.cookieName, token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
          });
        } catch (error) {
          console.error("Token refresh error:", error);
        }
      }, 10 * 60 * 1000); // Refresh every 10 minutes
    }

    return () => {
      unsubscribe();
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateUserMetadata(result.user);
      return result.user;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateUserMetadata(result.user, true);
      return result.user;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      await updateUserMetadata(result.user);
      return result.user;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      deleteCookie(appConfig.cookieName);
      setUser(null);
      setIsAdmin(false);
      setMetadata(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const updateUserRole = async (newIsAdmin: boolean) => {
    try {
      setError(null);
      // Call your admin API to update user role
      const response = await fetch("/api/update-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({ isAdmin: newIsAdmin }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role");
      }

      // Force token refresh to get new claims
      if (user) {
        await user.getIdToken(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const value = {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
