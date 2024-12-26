import { FirebaseError } from "@/types";
import toast from "react-hot-toast";

export const getFirebaseErrorMessage = (error: unknown): string => {
  if (error && typeof error === "object" && "code" in error) {
    const firebaseError = error as FirebaseError;
    switch (firebaseError.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please try logging in instead.";
      case "auth/invalid-email":
        return "Invalid email address. Please check and try again.";
      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled. Please contact support.";
      case "auth/weak-password":
        return "Password is too weak. Please use a stronger password.";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      default:
        return firebaseError.message || "An unknown error occurred.";
    }
  }
  return "An unexpected error occurred. Please try again.";
};

export const handleError = (error: unknown, customMessage?: string) => {
  console.error(error);
  const message = customMessage || getFirebaseErrorMessage(error);
  toast.error(message);
};

export const handleSuccess = (message: string) => {
  toast.success(message);
};
