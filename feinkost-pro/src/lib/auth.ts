import { randomBytes, timingSafeEqual } from "crypto";

const ADMIN_USER = process.env.ADMIN_USERNAME || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";

// In-memory session token. Acceptable for single-instance deployment.
// For multi-instance/serverless, replace with Redis or DB-backed sessions.
let activeSession: string | null = null;

// --- Rate limiter ---
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

// Clean up stale entries every 15 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    loginAttempts.forEach((data, ip) => {
      if (now - data.firstAttempt > LOGIN_WINDOW_MS) {
        loginAttempts.delete(ip);
      }
    });
  }, LOGIN_WINDOW_MS);
}

/** Timing-safe string comparison */
export function safeCompare(a: string, b: string): boolean {
  if (!a || !b) return false;
  const bufA = Buffer.from(a, "utf-8");
  const bufB = Buffer.from(b, "utf-8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now - entry.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  entry.count++;
  return entry.count > LOGIN_MAX_ATTEMPTS;
}

export function getClientIp(request: Request): string {
  const headers = new Headers(request.headers);
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

export function attemptLogin(username: string, password: string): string | null {
  if (safeCompare(username, ADMIN_USER) && safeCompare(password, ADMIN_PASS)) {
    const token = randomBytes(32).toString("hex");
    activeSession = token;
    return token;
  }
  return null;
}

export function clearSession(): void {
  activeSession = null;
}

export function validateSession(token: string | null): boolean {
  if (!token || !activeSession) return false;
  return safeCompare(token, activeSession);
}
