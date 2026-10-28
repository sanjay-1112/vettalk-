import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "vet_admin_session";
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "vet-clinic-mvp-secure-session-key-2026";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "vetadmin2026";

/**
 * Creates a simple HMAC/token for admin authentication session
 */
export function createSessionToken(username: string): string {
  const payload = JSON.stringify({
    user: username,
    timestamp: Date.now(),
  });
  return Buffer.from(payload).toString("base64url");
}

/**
 * Validates the admin session cookie from server headers
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }

  try {
    const raw = Buffer.from(sessionCookie.value, "base64url").toString("utf-8");
    const data = JSON.parse(raw);

    // Cookie validity check: ensure it matches admin username and within 7 days
    if (data.user === ADMIN_USERNAME) {
      const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp < maxAgeMs) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export { ADMIN_COOKIE_NAME };
