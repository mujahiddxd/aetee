import { NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth';

// ── In-memory brute force rate limiter ──────────────────────────────
// Tracks failed login attempts per IP. Resets after WINDOW_MS.
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function isRateLimited(ip) {
  const record = loginAttempts.get(ip);
  if (!record) return false;

  // Reset if the window has passed
  if (Date.now() - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(ip);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip) {
  const record = loginAttempts.get(ip);
  if (!record || Date.now() - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
  } else {
    record.count += 1;
  }
}

function clearAttempts(ip) {
  loginAttempts.delete(ip);
}

// Clean up stale entries every 30 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of loginAttempts) {
    if (now - record.firstAttempt > WINDOW_MS) {
      loginAttempts.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// ────────────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Check rate limit before processing
    if (isRateLimited(clientIp)) {
      const record = loginAttempts.get(clientIp);
      const remainingMs = WINDOW_MS - (Date.now() - record.firstAttempt);
      const remainingMins = Math.ceil(remainingMs / 60000);

      return NextResponse.json(
        { success: false, error: `Too many login attempts. Please try again in ${remainingMins} minute(s).` },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'aetee@2026';

    if (username === validUsername && password === validPassword) {
      clearAttempts(clientIp);
      const token = generateAdminToken();

      const response = NextResponse.json({ success: true, message: 'Logged in successfully' }, { status: 200 });
      
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    // Record failed attempt
    recordFailedAttempt(clientIp);
    const record = loginAttempts.get(clientIp);
    const attemptsRemaining = MAX_ATTEMPTS - record.count;

    return NextResponse.json(
      { success: false, error: attemptsRemaining > 0 ? `Invalid credentials. ${attemptsRemaining} attempt(s) remaining.` : 'Too many failed attempts. Account temporarily locked.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
