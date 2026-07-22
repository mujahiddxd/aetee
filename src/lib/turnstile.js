/**
 * Cloudflare Turnstile server-side verification helper.
 *
 * Canonical siteverify call — used by every API route that accepts a
 * public form submission.  The secret is read from process.env.TURNSTILE_SECRET
 * and is never hard-coded.
 *
 * @param {string} token   – The cf-turnstile-response value from the request body.
 * @param {string} remoteip – The client IP (X-Forwarded-For / req.ip / etc.).
 * @returns {Promise<{success: boolean, errorCodes?: string[]}>}
 */
export async function verifyTurnstile(token, remoteip) {
  if (!token) {
    return { success: false, errorCodes: ['missing-input-response'] };
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    console.error('TURNSTILE_SECRET is not set in the environment.');
    return { success: false, errorCodes: ['missing-input-secret'] };
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip,
    }),
  });

  const result = await res.json();
  return {
    success: result.success === true,
    errorCodes: result['error-codes'] || [],
  };
}
