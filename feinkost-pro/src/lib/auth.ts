import { createHmac, timingSafeEqual } from "crypto";

const ADMIN_USER = process.env.ADMIN_USERNAME || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";

// Secret for HMAC token signing — derived from admin password + a salt
const TOKEN_SECRET = ADMIN_PASS + "__feinkost_token_salt__";
// Token validity: 7 days
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

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

/** Create a stateless HMAC-signed token: "timestamp.signature" */
function createToken(): string {
  const timestamp = Date.now().toString();
  const sig = createHmac("sha256", TOKEN_SECRET).update(timestamp).digest("hex");
  return `${timestamp}.${sig}`;
}

export function attemptLogin(username: string, password: string): string | null {
  if (safeCompare(username, ADMIN_USER) && safeCompare(password, ADMIN_PASS)) {
    return createToken();
  }
  return null;
}

export function clearSession(): void {
  // No-op for stateless tokens — token expires naturally
}

/** Validate a stateless HMAC token: check signature + expiry */
export function validateSession(token: string | null): boolean {
  if (!token) return false;

  const dotIndex = token.indexOf(".");
  if (dotIndex === -1) return false;

  const timestamp = token.substring(0, dotIndex);
  const signature = token.substring(dotIndex + 1);

  // Verify HMAC signature
  const expectedSig = createHmac("sha256", TOKEN_SECRET).update(timestamp).digest("hex");
  if (!safeCompare(signature, expectedSig)) return false;

  // Check expiry
  const created = parseInt(timestamp, 10);
  if (isNaN(created)) return false;
  if (Date.now() - created > TOKEN_MAX_AGE_MS) return false;

  return true;
}
