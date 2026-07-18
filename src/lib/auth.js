import crypto from 'crypto';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'aetee-default-secret-key-2026';

/**
 * Generates a signed admin token using HMAC-SHA256.
 * Both the login route (Node.js) and middleware (Edge) compute this same value.
 */
export function generateAdminToken() {
  return crypto.createHmac('sha256', ADMIN_SECRET).update('admin-session').digest('hex');
}
