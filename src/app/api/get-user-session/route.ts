import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "@/utils/user";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get("userId");
        const sessionId = searchParams.get("sessionId");

        // Validate required parameters
        if (!userId || !sessionId) {
            return NextResponse.json(
                { error: "Missing required parameters" },
                { status: 400 }
            );
        }

        // Validate the session using the existing utility function
        const isValidSession = await validateSession(userId, sessionId);

        return NextResponse.json({ isValid: isValidSession });
    } catch (error) {
        console.error("Error validating session:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}