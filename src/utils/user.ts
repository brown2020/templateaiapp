import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { UserProfile } from "@/types";

export const createUserProfile = async (user: User): Promise<void> => {
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: "user",
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  await setDoc(doc(db, "users", user.uid), userProfile);
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as UserProfile;
    // Convert Firestore Timestamps to Dates
    return {
      ...data,
      createdAt:
        data.createdAt instanceof Date
          ? data.createdAt
          : new Date(data.createdAt),
      lastLogin:
        data.lastLogin instanceof Date
          ? data.lastLogin
          : new Date(data.lastLogin),
    };
  }

  return null;
};

export const updateLastLogin = async (uid: string): Promise<void> => {
  await setDoc(
    doc(db, "users", uid),
    {
      lastLogin: new Date(),
    },
    { merge: true }
  );
};

export const isAdmin = (userProfile: UserProfile | null): boolean => {
  return userProfile?.role === "admin";
};

export const getInitials = (name: string | null): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getAvatarUrl = (user: User | null): string => {
  if (!user) return "";
  return (
    user.photoURL ||
    `https://ui-avatars.com/api/?name=${
      user.displayName || user.email
    }&background=random`
  );
};
