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
