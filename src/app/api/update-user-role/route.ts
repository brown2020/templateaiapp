import { NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { initAdmin } from "@/firebase/firebaseAdmin";

export async function POST(request: Request) {
  try {
    // Initialize Firebase Admin if not already initialized
    initAdmin();

    // Get the authorization token
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Verify the token
    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(token);

    // Check if the current user is an admin
    if (!decodedToken.admin) {
      return NextResponse.json(
        { error: "Unauthorized: Requires admin privileges" },
        { status: 403 }
      );
    }

    // Get the request body
    const body = await request.json();
    const { userId, isAdmin } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId in request body" },
        { status: 400 }
      );
    }

    // Update custom claims
    await auth().setCustomUserClaims(userId, { admin: isAdmin });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
