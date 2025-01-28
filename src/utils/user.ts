import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { UserProfile } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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
    `https://ui-avatars.com/api/?name=${user.displayName || user.email
    }&background=random`
  );
};

export function detectBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Edg") > -1) {
    return "Microsoft Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } else if (userAgent.indexOf("Opera") > -1) {
    return "Opera";
  } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
    return "Internet Explorer";
  }

  return "Unknown";
}

export function detectOS() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Windows") > -1) {
    return "Windows";
  } else if (userAgent.indexOf("Mac") > -1) {
    return "macOS";
  } else if (userAgent.indexOf("Linux") > -1) {
    return "Linux";
  } else if (userAgent.indexOf("Android") > -1) {
    return "Android";
  } else if (userAgent.indexOf("iOS") > -1) {
    return "iOS";
  }
  return "Unknown";
}

export async function getUserLocation() {
  console.log("calling getUserLocation");
  try {
    const response = await fetch(`https://ipinfo.io?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`);
    const data = await response.json();
    return `${data.city}, ${data.region}`;
  } catch (error) {
    console.error('Error fetching user location:', error);
    return 'Unknown Location';
  }
}
export function generateUuid(): string {
  return uuidv4();
}