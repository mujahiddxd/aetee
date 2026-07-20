import { NextResponse } from 'next/server';

export async function GET(req) {
  // WhatsApp Webhook Verification Step
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // You will set this token in your .env and provide the same string to the Meta dashboard
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN; 

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WHATSAPP WEBHOOK VERIFIED");
      // Meta requires us to return the exact challenge string as plain text
      return new NextResponse(challenge, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    } else {
      return NextResponse.json({ error: 'Verification failed - token mismatch' }, { status: 403 });
    }
  }

  return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
}

export async function POST(req) {
  try {
    const body = await req.json();

    // This will log any incoming messages from customers or status updates (read/delivered)
    console.log('Incoming WhatsApp Event:', JSON.stringify(body, null, 2));

    // Acknowledge the event to Meta so they stop retrying
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('WhatsApp Webhook POST Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
