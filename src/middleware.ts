import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminPaths, privatePaths, redirects, appConfig } from "./appConfig";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Get auth token from cookies using the exact cookie name from appConfig
  const authToken = request.cookies.get(appConfig.cookieName);
  const isAuthenticated = !!authToken?.value;

  // Debug log (remove in production)
  console.log({
    path,
    isAuthenticated,
    cookieName: appConfig.cookieName,
    authToken: authToken?.value,
  });

  // Handle redirects first
  if (redirects[path]) {
    return NextResponse.redirect(new URL(redirects[path], request.url));
  }

  // Check if the path is private or admin
  const isPrivate = privatePaths.some((p) => path.startsWith(p));
  const isAdmin = adminPaths.some((p) => path.startsWith(p));

  // Handle authentication for private and admin routes
  if (isPrivate || isAdmin) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages only
  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
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
