import { NextResponse } from "next/server";
import {
  attemptLogin,
  clearSession,
  isRateLimited,
  getClientIp,
} from "@/lib/auth";

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many login attempts. Try again later." },
      { status: 429 }
    );
  }

  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, error: "Missing credentials" },
      { status: 400 }
    );
  }

  const token = attemptLogin(username, password);

  if (token) {
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { success: false, error: "Invalid credentials" },
    { status: 401 }
  );
}

export async function DELETE() {
  clearSession();
  return NextResponse.json({ success: true });
}
