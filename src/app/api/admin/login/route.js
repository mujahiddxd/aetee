import { NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth';
import { verifyTurnstile } from '@/lib/turnstile';
import { prisma } from '@/lib/prisma';

// DB-backed brute-force rate limiter (persistent across restarts and PM2 workers)
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // ── DB-backed rate limit check ──────────────────────────────────
    if (clientIp !== 'unknown') {
      // Atomically create-or-fetch the record using upsert.
      // This avoids the TOCTOU race condition where concurrent requests
      // would all see "no record" and crash with a P2002 unique constraint error.
      const record = await prisma.rateLimit.upsert({
        where: { ip_action: { ip: clientIp, action: 'admin_login' } },
        update: {}, // No-op: just fetch the existing record
        create: { ip: clientIp, action: 'admin_login', count: 0 },
      });

      const windowExpired = Date.now() - record.firstAttempt.getTime() > WINDOW_MS;

      if (!windowExpired && record.count >= MAX_ATTEMPTS) {
        const remainingMs = WINDOW_MS - (Date.now() - record.firstAttempt.getTime());
        const remainingMins = Math.ceil(remainingMs / 60000);
        return NextResponse.json(
          { success: false, error: `Too many login attempts. Please try again in ${remainingMins} minute(s).` },
          { status: 429 }
        );
      }

      // If window expired, reset the counter (will be incremented on failure below)
      if (windowExpired) {
        await prisma.rateLimit.update({
          where: { ip_action: { ip: clientIp, action: 'admin_login' } },
          data: { count: 0, firstAttempt: new Date() },
        });
      }
    }
    // ────────────────────────────────────────────────────────────────

    const body = await request.json();
    const { username, password } = body;
    const turnstileToken = body['cf-turnstile-response'];

    // ── Turnstile verification ──────────────────────────────────────
    const turnstileResult = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bot verification failed' },
        { status: 403 }
      );
    }
    // ────────────────────────────────────────────────────────────────

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error: Admin credentials are not set.' },
        { status: 500 }
      );
    }

    if (username === validUsername && password === validPassword) {
      // Successful login — reset the rate limit counter for this IP
      if (clientIp !== 'unknown') {
        await prisma.rateLimit.update({
          where: { ip_action: { ip: clientIp, action: 'admin_login' } },
          data: { count: 0, firstAttempt: new Date() },
        }).catch(() => {}); // Silently ignore if record doesn't exist yet
      }

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

    // Failed login — increment the counter atomically
    if (clientIp !== 'unknown') {
      await prisma.rateLimit.update({
        where: { ip_action: { ip: clientIp, action: 'admin_login' } },
        data: { count: { increment: 1 } },
      }).catch(() => {}); // Silently ignore if record doesn't exist yet
    }

    // Re-fetch to show accurate remaining attempts
    const updatedRecord = clientIp !== 'unknown'
      ? await prisma.rateLimit.findUnique({ where: { ip_action: { ip: clientIp, action: 'admin_login' } } })
      : null;
    const attemptsRemaining = updatedRecord ? Math.max(0, MAX_ATTEMPTS - updatedRecord.count) : MAX_ATTEMPTS - 1;

    return NextResponse.json(
      { success: false, error: attemptsRemaining > 0 ? `Invalid credentials. ${attemptsRemaining} attempt(s) remaining.` : 'Too many failed attempts. Account temporarily locked.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
