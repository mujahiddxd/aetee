import crypto from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET;

/**
 * Generates a signed admin token using HMAC-SHA256.
 * Both the login route (Node.js) and middleware (Edge) compute this same value.
 */
export function generateAdminToken() {
  if (!ADMIN_SECRET) {
    throw new Error("ADMIN_SECRET environment variable is not defined");
  }
  return crypto.createHmac('sha256', ADMIN_SECRET).update('admin-session').digest('hex');
}

/**
 * Verify an admin_token cookie (Node.js runtime version).
 * Mirrors the Edge-Runtime check in src/middleware.js.
 *
 * @param {{ get: (name: string) => { value?: string } | undefined }} cookieStore
 *        The store returned by `await cookies()` from 'next/headers'.
 */
export function verifyAdminCookie(cookieStore) {
  const token = cookieStore.get('admin_token');
  if (!token?.value) return false;
  if (!ADMIN_SECRET) return false;

  const expectedToken = crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update('admin-session')
    .digest('hex');

  return token.value === expectedToken;
}
