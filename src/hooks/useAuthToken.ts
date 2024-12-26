"use client";

import { useCallback, useEffect, useState } from "react";
import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { debounce } from "lodash";
import { useAuthStore } from "@/zustand/useAuthStore";
import { auth } from "@/firebase/firebaseConfig";

let renderCount = 0;

const useAuthToken = (cookieName: string = "authToken") => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const setAuthDetails = useAuthStore((state) => state.setAuthDetails);
  const clearAuthDetails = useAuthStore((state) => state.clearAuthDetails);

  const refreshInterval = 50 * 60 * 1000; // 50 minutes
  const [activityTimeout, setActivityTimeout] = useState<NodeJS.Timeout>();
  const lastTokenRefresh = `lastTokenRefresh_${cookieName}`;

  console.log("rendering useAuthToken:", renderCount++);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setLoading(false);
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
          clearAuthDetails();
          deleteCookie(cookieName);
        }
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [clearAuthDetails, cookieName]);

  const checkAdmin = useCallback(async () => {
    console.log("Checking admin", renderCount);

    try {
      if (!user) throw new Error("No user found");
      const idTokenResult = await getIdToken(user, true);
      const response = await fetch("/api/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idTokenResult}`,
        },
      });

      const data = await response.json();
      if (response.status !== 200) throw new Error("Error checking admin");

      if (data.claimsChanged) {
        const refreshedIdToken = await getIdToken(user, true);

        setCookie(cookieName, refreshedIdToken, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      } else {
        setCookie(cookieName, idTokenResult, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }
      setAuthDetails({ isAdmin: data.admin || false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message || "Authentication error");
      } else {
        console.error("Unknown error occurred during admin check");
      }
      setAuthDetails({ isAdmin: false });
      deleteCookie(cookieName);
    }
  }, [cookieName, setAuthDetails, user]);

  const refreshAuthToken = useCallback(async () => {
    try {
      if (!auth.currentUser) throw new Error("No user found");
      const idTokenResult = await getIdToken(auth.currentUser, true);

      setCookie(cookieName, idTokenResult, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      window.localStorage.setItem(lastTokenRefresh, Date.now().toString());
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message || "Error refreshing token");
      } else {
        console.log("Unknown error occurred while refreshing token");
      }
      deleteCookie(cookieName);
    }
  }, [cookieName, lastTokenRefresh]);

  const scheduleTokenRefresh = useCallback(() => {
    clearTimeout(activityTimeout);
    if (document.visibilityState === "visible") {
      const timeoutId = setTimeout(refreshAuthToken, refreshInterval);
      setActivityTimeout(timeoutId);
    }
  }, [activityTimeout, refreshAuthToken, refreshInterval]);

  const debouncedStorageHandler = debounce((e: StorageEvent) => {
    if (e.key === lastTokenRefresh) {
      scheduleTokenRefresh();
    }
  }, 1000);

  // Handle storage events for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => debouncedStorageHandler(e);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearTimeout(activityTimeout);
      debouncedStorageHandler.cancel();
    };
  }, [activityTimeout, debouncedStorageHandler]);

  useEffect(() => {
    if (user?.uid) {
      setAuthDetails({
        uid: user.uid,
        authEmail: user.email || "",
        authDisplayName: user.displayName || "",
        authPhotoUrl: user.photoURL || "",
        authEmailVerified: user.emailVerified || false,
        authReady: true,
        authPending: false,
      });

      checkAdmin();
    } else {
      clearAuthDetails();
      deleteCookie(cookieName);
    }
  }, [
    checkAdmin,
    clearAuthDetails,
    cookieName,
    setAuthDetails,
    user?.uid,
    user?.email,
    user?.displayName,
    user?.photoURL,
    user?.emailVerified,
  ]);

  return { uid: user?.uid, loading, error };
};

export default useAuthToken;
