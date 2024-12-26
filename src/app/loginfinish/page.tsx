"use client";

import { appConfig } from "@/appConfig";
import { auth } from "@/firebase/firebaseConfig";
import { useAuthStore } from "@/zustand/useAuthStore";
import { FirebaseError } from "firebase/app";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FinishSignUp() {
  const router = useRouter();
  const setAuthDetails = useAuthStore((s) => s.setAuthDetails);

  useEffect(() => {
    async function attemptSignIn() {
      try {
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          throw new Error("Sign in link is not valid");
        }

        let email = window.localStorage.getItem(appConfig.storage.emailSave);
        const name =
          window.localStorage.getItem(appConfig.storage.nameSave) || "";
        if (!email) {
          email = window.prompt("Please confirm your email");
          if (!email) {
            throw new Error("Email confirmation cancelled by user");
          }
        }

        const userCredential = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );

        const user = userCredential.user;
        const authEmail = user?.email;
        const uid = user?.uid;
        const authDisplayName = user?.displayName || name || "";
        if (!uid || !authEmail) {
          throw new Error("No user found");
        }

        console.log("User signed in successfully:", authEmail, uid, name);

        setAuthDetails({
          uid,
          authEmail,
          authDisplayName,
        });
      } catch (error) {
        let errorMessage = "Unknown error signing in";
        if (error instanceof FirebaseError) {
          errorMessage = error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.log("ERROR", errorMessage);
        alert(errorMessage);
      } finally {
        window.localStorage.removeItem(appConfig.storage.emailSave);
        window.localStorage.removeItem(appConfig.storage.nameSave);
        router.replace("/");
      }
    }

    attemptSignIn();
  }, [router, setAuthDetails]);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="text-2xl font-semibold">Signing you in...</div>
    </div>
  );
}
