import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminPaths, privatePaths, redirects, appConfig } from "./appConfig";
import { WEBAPP_URL } from "./utils/constants";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/types";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get auth token from cookies using the exact cookie name from appConfig
  const authToken = request.cookies.get(appConfig.cookieName);
  const isAuthenticated = !!authToken?.value;

  let isAdmin = false;
  if (authToken?.value) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(authToken.value);
      isAdmin = !!decodedToken.admin;
    } catch (error) {
      console.error("Token decoding error:", error);
      // Treat as unauthenticated if token is invalid
      isAdmin = false;
    }
  }

  // Debug log (remove in production)
  console.log({
    path,
    isAuthenticated,
    cookieName: appConfig.cookieName,
    authToken: authToken?.value,
    isAdmin,
  });

  // Handle redirects first
  if (redirects[path]) {
    return NextResponse.redirect(new URL(redirects[path], request.url));
  }

  // Check if the path is private or admin
  const isPrivate = privatePaths.some((p) => path.startsWith(p));
  const isAdminPath = adminPaths.some((p) => path.startsWith(p));

  // Handle authentication for private and admin routes
  if (isPrivate || isAdminPath) {
    if (!isAuthenticated) {
      const loginUrl = `${WEBAPP_URL}/login?callbackUrl=${encodeURIComponent(WEBAPP_URL + request.nextUrl.pathname + request.nextUrl.search)}`;
      return NextResponse.redirect(loginUrl);
    }
  }

  // Check if the user is an admin and the path is an admin path
  if (isAuthenticated && isAdminPath && !isAdmin) {
    return NextResponse.redirect(`${WEBAPP_URL}/unauthorized`);
  }

  // Redirect authenticated users away from auth pages only
  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  const response = NextResponse.next();

  // Prevent click jacking by disabling iframe embedding
  response.headers.set('X-Frame-Options', 'DENY');
  return response;
}

// Update matcher to include all paths we want to handle
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
