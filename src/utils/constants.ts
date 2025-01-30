import { adminPaths } from "@/appConfig";

export const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || "http://localhost:3000";

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Successfully logged in!",
  LOGIN_ERROR: "Failed to login. Please check your credentials.",
  SIGNUP_SUCCESS: "Account created successfully!",
  SIGNUP_ERROR: "Failed to create account.",
  GOOGLE_LOGIN_SUCCESS: "Successfully logged in with Google!",
  GOOGLE_LOGIN_ERROR: "Failed to login with Google.",
  GOOGLE_SIGNUP_SUCCESS: "Account created successfully with Google!",
  GOOGLE_SIGNUP_ERROR: "Failed to create account with Google.",
  LOGOUT_SUCCESS: "Successfully signed out!",
  LOGOUT_ERROR: "Failed to sign out.",
  PASSWORD_MISMATCH: "Passwords do not match!",
  PASSWORDLESS_EMAIL_SENT: "Check your email for the sign-in link",
  PASSWORDLESS_EMAIL_ERROR: "Failed to send sign-in email",
  PASSWORD_RESET_EMAIL_SENT: "Password reset email sent! Check your inbox",
  PASSWORD_RESET_EMAIL_ERROR: "Failed to send password reset email",
  EMAIL_REQUIRED: "Please enter your email address first",
  PASSWORD_REQUIRED: "Please enter your password",
  INVALID_EMAIL: "Invalid email address",
} as const;

export const PROFILE_MESSAGES = {
  USER_NOT_FOUND: "No user found",
  UPDATE_SUCCESS: "Profile updated successfully!",
  UPDATE_ERROR: "Failed to update profile.",
  FETCH_ERROR: "Failed to fetch profile data.",
  DELETE_SUCCESS: "Profile deleted successfully!",
  DELETE_ERROR: "Failed to delete profile.",
  INVALID_DATA: "Invalid profile data provided.",
  PHOTO_UPDATE_SUCCESS: "Profile photo updated successfully!",
  PHOTO_UPDATE_ERROR: "Failed to update profile photo.",
} as const;

export const SETTINGS_MESSAGES = {
  UPDATE_SUCCESS: "Settings saved successfully!",
  UPDATE_ERROR: "Failed to save settings.",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  ACCOUNT: "/account",
  ABOUT: "/about",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  PRICING: "/pricing",

  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_SETTINGS: "/admin/settings",
} as const;

export const IGNORE_NAV = [
  "/admin",
  "/admin/dashboard",
  "/admin/users",
  "/admin/settings",
  "/login",
  "/signup",
  "/loginfinish",
  "/unauthorized",
];

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
} as const;
