/**
 * Minimal, dependency-free auth for the single-client admin.
 *
 * Sign-in compares against ADMIN_PASSWORD; on success we set an httpOnly cookie
 * holding an HMAC-signed, time-stamped token. Verification recomputes the HMAC
 * with ADMIN_SESSION_SECRET, so the cookie cannot be forged or replayed past
 * its expiry. This works the same in `next dev` and on Vercel.
 */
import crypto from "crypto";

export const SESSION_COOKIE = "ecomulch_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14; // 14 days

// The dev defaults below are public (the repo is), so in production the admin
// stays locked until ADMIN_PASSWORD and ADMIN_SESSION_SECRET are both set.
const isProd = process.env.NODE_ENV === "production";
const adminLocked = () =>
  isProd && (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET);

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    // A build-time default keeps dev working; production must set a real secret.
    "dev-insecure-secret-change-me"
  );
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Timing-safe compare of the configured password. */
export function checkPassword(input: string): boolean {
  if (adminLocked()) return false;
  const expected = process.env.ADMIN_PASSWORD || "ecomulch"; // dev default
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const issued = Date.now().toString();
  return `${issued}.${sign(issued)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || adminLocked()) return false;
  const [issued, mac] = token.split(".");
  if (!issued || !mac) return false;
  const expected = sign(issued);
  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  ) {
    return false;
  }
  const age = (Date.now() - Number(issued)) / 1000;
  return age >= 0 && age < MAX_AGE_SECONDS;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
