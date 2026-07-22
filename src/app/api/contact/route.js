import { NextResponse } from 'next/server';
import { verifyTurnstile } from '@/lib/turnstile';

// In-memory rate limiting for contact form
const contactAttempts = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_ATTEMPTS_PER_WINDOW = 3;

// Lazy cleanup
function cleanupStaleContactAttempts() {
  const now = Date.now();
  for (const [ip, record] of contactAttempts) {
    if (now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
      contactAttempts.delete(ip);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // ── Turnstile verification ──────────────────────────────────────
    const turnstileToken = body['cf-turnstile-response'];
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    cleanupStaleContactAttempts();
    
    // Rate limit check
    if (clientIp !== 'unknown') {
      const record = contactAttempts.get(clientIp);
      if (record && Date.now() - record.firstAttempt <= RATE_LIMIT_WINDOW_MS) {
        if (record.count >= MAX_ATTEMPTS_PER_WINDOW) {
          const remainingMins = Math.ceil((RATE_LIMIT_WINDOW_MS - (Date.now() - record.firstAttempt)) / 60000);
          return NextResponse.json(
            { error: `You have sent too many messages. Please try again in ${remainingMins} minute(s).` },
            { status: 429 }
          );
        }
        record.count += 1;
      } else {
        contactAttempts.set(clientIp, { count: 1, firstAttempt: Date.now() });
      }
    }

    const turnstileResult = await verifyTurnstile(turnstileToken, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 });
    }
    // ────────────────────────────────────────────────────────────────

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = [
        'NEW CONTACT MESSAGE',
        '',
        'Name: ' + name,
        'Email: ' + email,
        '',
        'Message:',
        message,
        '',
        'Time: ' + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ].join('\n');

      const tgRes = await fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
        }),
      });

      const tgData = await tgRes.json();
      console.log('Telegram response:', JSON.stringify(tgData));

      if (!tgData.ok) {
        console.error('Telegram error:', tgData.description);
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
