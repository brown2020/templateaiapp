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
  LOGOUT_SUCCESS: "Successfully logged out!",
  LOGOUT_ERROR: "Failed to logout.",
  PASSWORD_MISMATCH: "Passwords do not match!",
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
} as const;

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
} as const;
