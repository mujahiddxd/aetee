/**
 * In-Memory Rate Limiter
 * 
 * Uses globalThis to persist across HMR reloads.
 * Zero database queries — faster and doesn't add DB load.
 * 
 * Usage:
 *   const limited = checkRateLimit(request, 'checkout', { max: 5, windowMs: 60000 });
 *   if (limited) return limited;
 */

import { NextResponse } from 'next/server';

const RL_KEY = '__aetee_rate_limits__';

if (!globalThis[RL_KEY]) {
  globalThis[RL_KEY] = new Map();
}

/** @type {Map<string, { count: number, resetAt: number }>} */
const store = globalThis[RL_KEY];

// Clean up expired entries every 5 minutes to prevent memory leaks
const CLEANUP_KEY = '__aetee_rl_cleanup__';
if (!globalThis[CLEANUP_KEY]) {
  globalThis[CLEANUP_KEY] = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store) {
      if (value.resetAt <= now) store.delete(key);
    }
  }, 5 * 60 * 1000);
}

/**
 * Check rate limit for a request.
 * 
 * @param {Request} request - The incoming request
 * @param {string} action - Unique action name (e.g. 'checkout', 'products_get')
 * @param {{ max: number, windowMs: number }} options - Rate limit options
 * @returns {NextResponse|null} - Returns 429 response if limited, null if allowed
 */
export function checkRateLimit(request, action, { max = 10, windowMs = 60000 }) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  if (ip === 'unknown') return null;

  const key = `${ip}:${action}`;
  const now = Date.now();
  const record = store.get(key);

  // No record or window expired — start fresh
  if (!record || record.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  // Within window and under limit
  if (record.count < max) {
    record.count++;
    return null;
  }

  // Rate limited
  const remainingSecs = Math.ceil((record.resetAt - now) / 1000);
  return NextResponse.json(
    { error: `Too many requests. Please try again in ${remainingSecs} seconds.` },
    {
      status: 429,
      headers: {
        'Retry-After': String(remainingSecs),
        'X-RateLimit-Limit': String(max),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(record.resetAt / 1000)),
      },
    }
  );
}
