import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendTelegramMessage, escapeHtml } from '@/lib/telegram';



// DB-backed rate limiting for contact form (persistent across restarts and PM2 workers)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS_PER_WINDOW = 3;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    // ── DB-backed rate limit check ─────────────────────────────────
    if (clientIp !== 'unknown') {
      // Atomically create-or-fetch the record using upsert.
      // This avoids the TOCTOU race condition where concurrent requests
      // would all see "no record" and crash with a P2002 unique constraint error.
      const record = await prisma.rateLimit.upsert({
        where: { ip_action: { ip: clientIp, action: 'contact' } },
        update: {}, // No-op: just fetch the existing record
        create: { ip: clientIp, action: 'contact', count: 0 },
      });

      const windowExpired = Date.now() - record.firstAttempt.getTime() > RATE_LIMIT_WINDOW_MS;

      if (windowExpired) {
        // Window has passed — reset the counter for a fresh window
        await prisma.rateLimit.update({
          where: { ip_action: { ip: clientIp, action: 'contact' } },
          data: { count: 1, firstAttempt: new Date() },
        });
      } else if (record.count >= MAX_ATTEMPTS_PER_WINDOW) {
        // Within the window and limit reached — reject
        const remainingMins = Math.ceil(
          (RATE_LIMIT_WINDOW_MS - (Date.now() - record.firstAttempt.getTime())) / 60000
        );
        return NextResponse.json(
          { error: `You have sent too many messages. Please try again in ${remainingMins} minute(s).` },
          { status: 429 }
        );
      } else {
        // Within window and under the limit — increment atomically
        await prisma.rateLimit.update({
          where: { ip_action: { ip: clientIp, action: 'contact' } },
          data: { count: { increment: 1 } },
        });
      }
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = [
        'NEW CONTACT MESSAGE',
        '',
        'Name: ' + escapeHtml(name),
        'Email: ' + escapeHtml(email),
        '',
        'Message:',
        escapeHtml(message),
        '',
        'Time: ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ].join('\n');

      const tgResult = await sendTelegramMessage(text);

      if (!tgResult.ok) {
        console.error('Telegram error:', tgResult.description);
        return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
      }
    } else {
      console.error('Telegram credentials missing');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
