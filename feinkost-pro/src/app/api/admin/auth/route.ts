import { NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";

// Simple in-memory session (for production, use a proper session store)
let activeSession: string | null = null;

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, error: "Missing credentials" },
      { status: 400 }
    );
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Use ADMIN_PASS as the token so it stays consistent across serverless invocations
    activeSession = ADMIN_PASS;
    return NextResponse.json({ success: true, token: ADMIN_PASS });
  }

  return NextResponse.json(
    { success: false, error: "Invalid credentials" },
    { status: 401 }
  );
}

export async function DELETE() {
  activeSession = null;
  return NextResponse.json({ success: true });
}

// Validate token - export for use by other API routes
export function validateSession(token: string | null): boolean {
  return token !== null && token === activeSession;
}
