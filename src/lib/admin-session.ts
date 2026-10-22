/**
 * Server-side helpers that read and enforce the admin session from cookies.
 * Used by the protected admin layout (to redirect) and by every write API
 * route (to reject unauthenticated calls).
 */
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** For API routes: returns null when OK, or a 401 Response when not. */
export async function guardApi(): Promise<Response | null> {
  if (await isAuthenticated()) return null;
  return Response.json({ error: "Not authenticated" }, { status: 401 });
}
