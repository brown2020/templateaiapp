export type MenuItem = {
  label: string;
  href: string;
  show: "everyone" | "guest_only" | "user_only" | "admin_only";
  header: boolean;
  footer: boolean;
  icon?: string;
};

export type UserRole = "user" | "admin";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  bio?: string;
  createdAt: Date;
  updatedAt?: Date;
  lastLogin: Date;
}

export interface AppConfig {
  siteName: string;
  siteDescription: string;
  siteAbout: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyLocation: string;
  privacyUpdated: string;
  termsUpdated: string;
  appBackground: string;
  pageBackground: string;
  pageText: string;
  cookieName: string;
}

export type FirebaseError = {
  code: string;
  message: string;
};

export interface DecodedToken {
  admin?: boolean;
  [key: string]: unknown;
}
